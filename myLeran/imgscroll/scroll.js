function runImg(minRange) {
	this.minRange = Number(minRange);
	this.ready_moved = true;
}
runImg.prototype = {
	bigbox: null, //最外层容器
	boxul: null, //子容器ul
	imglist: null, //子容器img
	numlist: null, //子容器countNum
	prev: 0, //上次显示项
	index: 0, //当前显示项
	timer: null, //控制图片转变效果
	play: null, //控制自动播放
	imgurl: [], //存放图片
	$: function(obj) {
		if (typeof(obj) == "string") {
			if (obj.indexOf("#") >= 0) {
				obj = obj.replace("#", "");
				if (document.getElementById(obj)) {
					return document.getElementById(obj);
				} else {
					alert("没有容器" + obj);
					return null;
				}
			} else {
				return document.createElement(obj);
			}
		} else {
			return obj;
		}
	},
	//初始化
	info: function(id) {
		this.count = this.imgurl.length;
		this.bigbox = this.$(id);
		for (var i = 0; i < 2; i++) {
			var ul = this.$("ul");
			for (var j = 1; j <= this.count; j++) {
				var li = this.$("li");
				li.innerHTML = i == 0 ? this.imgurl[j - 1] : j;
				ul.appendChild(li);
			}
			this.bigbox.appendChild(ul);
		}
		this.boxul = this.bigbox.getElementsByTagName("ul");
		this.boxul[0].className = "imgList";
		this.boxul[1].className = "countNum";
		this.imglist = this.boxul[0].getElementsByTagName("li");
		this.numlist = this.boxul[1].getElementsByTagName("li");

		// this.fadeOut(this.imglist); //隐藏所有图片
		// this.fadeIn(this.imglist[0]); //显示第一个图片

		for (var j = 0; j < this.imglist.length; j++) {
			this.alpha(j, 0);
		}
		this.alpha(0, 100);

		this.numlist[0].className = "current";
		this.action();
	},
	//封装程序入口
	action: function() {
		this.autoplay();
		this.mouseoverout();
		this.bindTouchEvn();

	},
	//在样式表中设置好 .fadeIn 的透明度为0
	fadeIn: function(e) {
	  e.classList.add("fadeIn")
	},
	fadeOut: function(e) {
	  Array.prototype.forEach.call(e, function(e) {
	    e.className = "";
	  })
	},
	//图片切换效果
	imgshow: function() {
		clearInterval(this.timer);
		// this.fadeOut(this.imglist);//所有图片隐藏
		// this.fadeOut(this.numlist); //所有圆圈隐藏

		// this.fadeIn(this.imglist[this.index]);
		// this.numlist[this.index].classList.add('current');

		var pralpha = 100;
		var inalpha = 0;
	
		for (var i = 0; i < this.numlist.length; i++) {
			this.numlist[i].className = "";
		}
		this.numlist[this.index].className = "current";
		
		for (var j = 0; j < this.imglist.length; j++) {
			this.alpha(j, 0);
		}
		this.alpha(this.prev, 100); //设置上一张的透明度为100
		this.alpha(this.index, 0); // 当前的一张不要透明度
		// 利用透明度来实现切换图片
		this.timer = setInterval(function() {
				inalpha += 2;
				pralpha -= 2;
				if (inalpha > 100) {
					inalpha = 100
				}; //不能大于100
				if (pralpha < 0) {
					pralpha = 100
				};
				//为兼容性赋样式
				this.alpha(this.prev, pralpha);
				this.alpha(this.index, inalpha);
				if (inalpha == 100 && pralpha == 0) {
					clearInterval(this.timer)
				}; //当等于100的时候就切换完成了
			}.bind(this), 20) 
	},
	//设置透明度
	alpha: function(i, opacity) {
		this.imglist[i].style.opacity = opacity / 100;
		this.imglist[i].style.filter = "alpha(opacity=" + opacity + ")";
	},
	//自动播放
	autoplay: function() {
		this.play = setInterval(function() {
			this.prev = this.index;
			this.index++;
			if (this.index > this.imglist.length - 1) {
				this.index = 0
			};
			this.imgshow();
		}.bind(this), 5000) //循环播放图片
	},
	//处理鼠标事件
	mouseoverout: function() {
		var $this = this;
		$this.bigbox.onmouseover = function(event) {
			clearInterval($this.play);
		}
		$this.bigbox.onmouseout = function() {
			$this.autoplay($this.index);
		}

		//鼠标移入下面的小圆点，图片停止播放，显示当前大图
		for (var i = 0,len=$this.numlist.length; i < len; i++) {
			(function(i) {
				$this.numlist[i].index = i;
				$this.numlist[i].onmouseover = function(event) {
				clearInterval($this.play);

				event.stopPropagation();
				 var e=(event)?event:window.event;
				 window.event?e.cancelBubble=true:e.stopPropagation();
				 // e.cancelBubble=true;// ie下阻止冒泡
				$this.index=event.target.index; //获取鼠标移入的序列
				$this.imgshow();
			}
			})(i)
		}
	},

	bindTouchEvn:function() {
	  this.boxul[0].addEventListener('touchstart', this.touchstart.bind(this), false)
	  this.boxul[0].addEventListener('touchmove', this.touchmove.bind(this), false)
	  this.boxul[0].addEventListener('touchend', this.touchend.bind(this), false)   
	},
	touchstart: function(e) {
	  if (this.ready_moved) {
	    var touch = e.touches[0];
	    this.touchX = touch.pageX;
	    this.ready_moved = false;
	    clearInterval(this.play); //触摸图片开始就终止图片的循环播放

	  }
	},
	touchmove: function(e) {
	  e.preventDefault();
	  var minRange = this.minRange;
	  var touchX = this.touchX;
	  var imgs_count = this.count;

	  if (!this.ready_moved) {

	    var release = e.changedTouches[0];
	    var releasedAt = release.pageX;
	    // 判断滑动的方向
	    if (releasedAt + minRange < touchX) {
	      this.ready_moved = true;
	      if (this.index >= (imgs_count - 1)) {
	        this.index = 0;
	      }
	      else {
	      	this.index++;
	      }
	      
	      this.imgshow(this.index);

	    } else if (releasedAt - minRange > touchX) {
	      if (this.index <= 0) {
	        this.index = imgs_count + 1
	      }
	      this.index--;
	      this.imgshow(this.index);
	      this.ready_moved = true;
	    }
	  }

	},
	touchend: function(e) {
	  e.preventDefault();
	  var minRange = this.minRange;
	  var touchX = this.touchX;
	  var imgs_count = this.count;
	  if (!this.ready_moved) {
	    var release = e.changedTouches[0];
	    var releasedAt = release.pageX;
	    if (releasedAt + minRange < touchX) {
	      this.ready_moved = true;
	      if (this.index > (imgs_count - 1)) {
	        this.index = 0;
	      }
	      else {
	      	this.index++;
	      }
	      
	      this.imgshow(this.index);

	    } else if (releasedAt - minRange > touchX) {
	      if (this.index <= 1) {
	        this.index = imgs_count + 1
	      }
	      this.index--;
	      this.imgshow(this.index);
	      this.ready_moved = true;
	    }
	  }
	  this.autoplay(this.index); //触摸离开以后再开始循环播放图片
	}
}

