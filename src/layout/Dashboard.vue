<script setup>

</script>
<template>  <aside class="sidebar" role="navigation" aria-label="Glavna navigacija">
    <div>
      <div class="brand" aria-hidden="true">
        <div class="logo-placeholder">
          LOGO
        </div>
        <div class="title">Cooking Hub</div>
      </div>
      <nav>
        <ul class="menu" role="menu" aria-label="Meni">
          <li role="none">
            <a href="#menu" class="active" role="menuitem">Menu</a>
          </li>
          <li role="none"><a href="#table" role="menuitem">Table Services</a></li>
          <li role="none"><a href="#reservation" role="menuitem">Reservation</a></li>
          <li role="none"><a href="#delivery" role="menuitem">Delivery</a></li>
          <li role="none"><a href="#accounting" role="menuitem">Accounting</a></li>
          <li role="none"><a href="#settings" role="menuitem">Settings</a></li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
<style>
    .sidebar{
      width: 17%;
      min-width: 260px;
      max-width: 340px;
      height:93vh;
      background:var(--dark);
      border-right:2px dashed var(--light);
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      padding:20px 48px;
      gap:var(gap);
      color: var(--light);
    }

    /* top area: logo + nav */
    .brand{
      display:flex;
      align-items:center;
      gap:12px;
      margin-bottom:8px;
    }

    .brand .logo-placeholder{
      width:44px;
      height:44px;
      border-radius:10px;
      background: linear-gradient(135deg, rgba(25,169,116,0.08), rgba(25,169,116,0.02));
      border:1px solid rgba(25,169,116,0.12);
      display:flex;
      align-items:center;
      justify-content:center;
      color:var(--primary);
      font-weight:700;
      font-size:13px;
    }

    .brand .title{
      font-weight:700;
      letter-spacing:0.3px;
      color:#fff;
      font-size:1.6rem;
    }

    nav{
      margin-top:18px;
    }

    .menu{
      list-style:none;
      padding:0;
      margin:0;
      display:flex;
      flex-direction:column;
      gap:10px;
    }

    .menu li{
      position:relative;
    }

    /* default menu button */
    .menu a{
      display:inline-block;
      text-decoration:none;
      color:var(--light);
      font-size:1.2rem;
      padding:10px 12px;
      border-radius:999px;
      transition: all .12s ease;
      width:100%;
    }

    .menu a:hover{
      background: var(--secondary);
      color:var(--light);
    }

    /* active - green pill */
    .menu a.active{
      background: var(--primary);
      color: var(--pill-text);
      font-weight:600;
    }
    /* small screens: collapse to narrow */
    @media (max-width:720px){
      .sidebar{ width:84px; min-width:84px; padding:16px; align-items:center }
      .brand .title{ display:none }
      .menu a{ padding:8px 10px; font-size:1rem; text-align:center; white-space:nowrap }
      .user-name{ display:none }
      .bottom{ align-items:center }
    }
  </style>