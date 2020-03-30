<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list-item">
        <nuxt-link to="/my">我的</nuxt-link>
          <dl>
            <dd><nuxt-link to="/order">我的订单</nuxt-link></dd>
            <dd><nuxt-link to="/order">我的收藏</nuxt-link></dd>
            <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
            <dd><nuxt-link to="/order">账户设置</nuxt-link></dd>
          </dl>
      </li>
      <li class="list-item">
        <nuxt-link to="/mobile">手机APP</nuxt-link>
      </li>
      <li class="list-item bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
          <dd><nuxt-link to="/order">登录商家中心</nuxt-link></dd>
          <dd><nuxt-link to="/order">美元智能收银</nuxt-link></dd>
          <dd><nuxt-link to="/order">抵用券</nuxt-link></dd>
          <dd><nuxt-link to="/order">账户设置</nuxt-link></dd>
        </dl>
      </li>
      <!-- <li class="list-item site">
        <nuxt-link to="/site">网站导航</nuxt-link>
        <div class="sub-menu">
          <dl class="hotel">
            <dt>酒店旅游</dt>
            <dd>国际机票</dd>
          </dl>
          <dl class="food">
            <dt>酒店旅游</dt>
            <dd>国际机票</dd>
          </dl>
          <dl class="move">
            <dt>酒店旅游</dt>
            <dd>国际机票</dd>
          </dl>
          <dl class="app">
            <dt>手机应用</dt>
            <dd>
              <a href="#">
								<img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" title="美团app" alt="美团app">
							</a>
            </dd>
            <dd>
              <a href="#">
								<img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" title="美团app" alt="美团app">
							</a>
            </dd>
            <dd>
              <a href="#">
								<img class="appicon" src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png" title="美团app" alt="美团app">
							</a>
            </dd>
          </dl>
        </div>
      </li> -->
    </ul>
  </div>
</template>