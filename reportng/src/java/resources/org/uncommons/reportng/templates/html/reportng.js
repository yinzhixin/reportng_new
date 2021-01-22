function toggleElement(elementId, displayStyle)
{
    var element = document.getElementById(elementId);
    var current = element.currentStyle
                ? element.currentStyle['display']
                : document.defaultView.getComputedStyle(element, null).getPropertyValue('display');
    element.style.display = (current == 'none' ? displayStyle : 'none');
}

function toggle(toggleId)
{
    var toggle = document.getElementById ? document.getElementById(toggleId) : document.all[toggleId];
    toggle.textContent = toggle.innerHTML == '\u25b6' ? '\u25bc' : '\u25b6';
}

var banners = 1;//banner显示的第一幅画面1~banner_max范围内任意选择
var banner_max;//banner总数
var global_unique_id;

function showBannerModal(unique_id, current_banner_num){
    load_banner(unique_id, current_banner_num);
    $("#screenshot-"+unique_id).modal('hide');
    $("#bannerModal"+unique_id).modal('show');
}

//img标签后直接调用运行
function load_banner(unique_id, current_banner_num)
{
    global_unique_id = unique_id;
    var img_num = $("#banner_container"+unique_id).children("img").length;//获取img标签的总数量
    banner_max = img_num;
    banners = current_banner_num;

 	//隐藏所有banner
 	for(var i=1; i<=banner_max; ++i)
	{
		$(".banner_img"+unique_id+"-"+i).fadeTo(100,0);
	}
	$(".banner_img"+unique_id+"-"+current_banner_num).fadeTo(100,1);//显示当前点击的图片

 	var numbers_span = "";
	for(var i=1; i<=img_num; ++i)
	{
		numbers_span += '<span class="num'+unique_id+'-'+i+'" onclick="manual_replace_banner('+i+')">'+i+'</span>'; //循环赋值到字符串
	}
	$("#numbers"+unique_id).html(numbers_span);//设置对应banner的数字
	banner_number();//调用数字颜色更换

	//自适应修改行高
	var banners_height = $("#banners"+unique_id).height();
	$("#banners"+unique_id).css("line-height",banners_height+"px");
}

//点击左右按钮更换banner
function banner_left_right(sj)
{
	var sjs;
	if(sj == "left")
	{
		if(banners == 1)
		{
			sjs = banner_max;
		}
		else
		{
			sjs = banners-1;
		}
	}
	else
	{
		if(banners == banner_max)
		{
			sjs = 1;
		}
		else
		{
			sjs = banners+1;
		}
	}
	manual_replace_banner(sjs);
}

//点击数字切换
function manual_replace_banner(sj)
{
	var bannerz = banners;

	banners = sj;

	if(banners == bannerz)
	{
		return;
	}
	fade_in_out(bannerz,banners);//调用切换函数
}

//自动更换banner
function auto_replace_banner()
{
	var bannerz = banners;

	if(banners == banner_max)
	{
		banners = 1;
	}
	else
	{
		banners += 1;
	}

	fade_in_out(bannerz,banners);//调用切换函数
}

//淡入淡出效果方法
function fade_in_out(bannerz,banners)
{
	var out_id = ".banner_img"+global_unique_id+"-"+bannerz;//淡出标签的ID名
	var banner_out=$(out_id);//获取淡出对象

	var in_id = ".banner_img"+global_unique_id+"-"+banners;//淡入标签的ID名
	var banner_in=$(in_id);//获取淡入对象

	banner_out.fadeTo(600,0);//JQuery方法淡出到指定透明度,参数1为速度，参数2为透明度
	banner_in.fadeTo(500,1);//JQuery方法淡入,参数1为速度，参数2为透明度

	banner_number();//调用数字颜色更换
}

//banner数字显示
function banner_number()
{
	for(var i=1; i<=banner_max; i++)
	{
		var num_id = ".num"+global_unique_id+"-"+i;
		var num_object = $(num_id);
		if(banners == i)
		{
			num_object.css("color" , "black");
			num_object.css("backgroundColor" , "white");
		}
		else
		{
			num_object.css("color" , "white");
			num_object.css("backgroundColor" , "rgba(0,0,0,0)");
		}
	}
}