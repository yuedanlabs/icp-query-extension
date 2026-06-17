<section class="about-page">
  <div class="about-header">
    <p>关于</p>
    <h1>面向网站核验的轻量查询工具</h1>
    <span>ICP Query Extension 用于快速查看当前网站的备案、WHOIS、DNS 和服务器位置结果。</span>
  </div>

  <div class="about-card iq-shell">
    <section class="feature-grid" aria-label="功能范围">
      <div>
        <strong>ICP 查询</strong>
        <span>展示备案主体、备案号和更新时间。</span>
      </div>
      <div>
        <strong>WHOIS 查询</strong>
        <span>查看注册商、日期、状态和注册属地。</span>
      </div>
      <div>
        <strong>DNS 查询</strong>
        <span>查看 A、AAAA、CNAME、NS 与位置结果。</span>
      </div>
      <div>
        <strong>开源维护</strong>
        <span>代码、更新记录和问题反馈均在 GitHub。</span>
      </div>
    </section>

    <section class="resource-list" aria-label="项目资源">
      <h2>项目资源</h2>
      <a href="https://github.com/yuedanlabs/icp-query-extension" target="_blank" rel="noopener noreferrer">
        <span>源代码</span>
        <strong>github.com/yuedanlabs/icp-query-extension</strong>
      </a>
      <a href="https://github.com/yuedanlabs/icp-query-extension/blob/main/README.zh-Hans.md" target="_blank" rel="noopener noreferrer">
        <span>中文简介</span>
        <strong>查看安装与使用说明</strong>
      </a>
      <a href="https://github.com/yuedanlabs/icp-query-extension/releases" target="_blank" rel="noopener noreferrer">
        <span>更新记录</span>
        <strong>查看版本发布历史</strong>
      </a>
      <a href="https://github.com/yuedanlabs/icp-query-extension/issues" target="_blank" rel="noopener noreferrer">
        <span>问题反馈</span>
        <strong>提交问题或建议</strong>
      </a>
    </section>

    <section class="contact-panel">
      <h2>需要协助？</h2>
      <p>如果查询结果不符合预期，可以通过邮件说明域名、使用的 API 地址和期望结果。</p>
      <a class="iq-button" href="mailto:yuedan.work+feedback@gmail.com?subject=Feedback%20for%20ICP%20Query%20Extension&body=Email%3A%20%3Cyour%20email%20address%2C%20optional%3E%0A*Token%3A%20%3Cyour%20token%20in%20use%3E%0A*Content%3A%20%3Cinput%20your%20suggestions%20or%20feedback%20here%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))">发送邮件</a>
    </section>
  </div>
</section>

<style>
  .about-page {
    max-width: 760px;
    text-align: left;
  }

  .about-header {
    margin-bottom: 18px;
  }

  .about-header p {
    margin: 0 0 8px;
    color: var(--iq-accent-strong);
    font-size: 13px;
    font-weight: 760;
    line-height: 1.2;
  }

  .about-header h1 {
    margin: 0;
    color: var(--iq-text);
    font-size: 28px;
    font-weight: 780;
    letter-spacing: -0.02em;
    line-height: 1.12;
  }

  .about-header span {
    display: block;
    max-width: 58ch;
    margin-top: 9px;
    color: var(--iq-text-muted);
    font-size: 14px;
    line-height: 1.6;
  }

  .about-card {
    overflow: hidden;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    background: var(--iq-border);
  }

  .feature-grid div {
    min-height: 118px;
    padding: 18px;
    background: var(--iq-surface);
  }

  .feature-grid strong {
    display: block;
    color: var(--iq-text);
    font-size: 14px;
    font-weight: 760;
    line-height: 1.3;
  }

  .feature-grid span {
    display: block;
    margin-top: 8px;
    color: var(--iq-text-muted);
    font-size: 13px;
    line-height: 1.55;
  }

  .resource-list {
    padding: 20px;
    border-top: 1px solid var(--iq-border);
  }

  .resource-list h2,
  .contact-panel h2 {
    margin: 0 0 12px;
    color: var(--iq-text);
    font-size: 16px;
    font-weight: 760;
    line-height: 1.3;
  }

  .resource-list a {
    display: grid;
    grid-template-columns: 100px minmax(0, 1fr);
    gap: 14px;
    padding: 13px 0;
    color: inherit;
    text-decoration: none;
  }

  .resource-list a + a {
    border-top: 1px solid rgb(148 163 184 / 0.22);
  }

  .resource-list span {
    color: var(--iq-text-muted);
    font-size: 13px;
    line-height: 1.45;
  }

  .resource-list strong {
    min-width: 0;
    color: var(--iq-text);
    font-size: 13px;
    font-weight: 680;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .resource-list a:hover strong {
    color: var(--iq-accent-strong);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .contact-panel {
    padding: 20px;
    border-top: 1px solid var(--iq-border);
    background: var(--iq-surface-subtle);
  }

  .contact-panel p {
    max-width: 60ch;
    margin: 0 0 16px;
    color: var(--iq-text-muted);
    font-size: 13px;
    line-height: 1.6;
  }

  @media (max-width: 720px) {
    .about-page {
      max-width: none;
    }

    .about-header h1 {
      font-size: 24px;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .resource-list a {
      grid-template-columns: 1fr;
      gap: 4px;
    }
  }
</style>
