<script lang="ts">
  import logo from "data-base64:~assets/favicon.png"
  import { onMount } from "svelte"

  import Options from "./Options.svelte"
  import About from "./about.svelte"

  import "~style.css"

  const components = [
    { hash: "#options", name: "设置", component: Options },
    { hash: "#about", name: "关于", component: About }
  ]
  let current

  function hashchange() {
    const hash = window.location.hash
    const c = components.find((e) => e.hash === hash)
    if (c) {
      current = c
    } else {
      window.location.hash = "#options"
    }
    window.scrollTo(0, 0)
  }

  onMount(hashchange)
</script>

<svelte:window on:hashchange={hashchange} />

<main class="options-shell">
  <aside class="options-sidebar iq-shell">
    <div class="brand-panel">
      <img src={logo} alt="ICP Query" />
      <div>
        <strong>ICP Query</strong>
        <span>浏览器扩展设置</span>
      </div>
    </div>

    <nav aria-label="设置导航">
      {#each components as component}
        <a
          class:active={component.hash === current?.hash}
          href={component.hash}>{component.name}</a>
      {/each}
    </nav>
  </aside>

  <section class="options-content">
    <svelte:component this={current?.component} />
  </section>
</main>

<style>
  .options-shell {
    display: grid;
    grid-template-columns: 240px minmax(0, 1fr);
    gap: 24px;
    width: min(1040px, calc(100vw - 32px));
    min-height: 100dvh;
    margin: 0 auto;
    padding: 32px 0;
  }

  .options-sidebar {
    position: sticky;
    top: 24px;
    align-self: start;
    padding: 16px;
  }

  .brand-panel {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--iq-border);
  }

  .brand-panel img {
    width: 42px;
    height: 42px;
    border-radius: 12px;
  }

  .brand-panel strong {
    display: block;
    color: var(--iq-text);
    font-size: 16px;
    font-weight: 780;
    line-height: 1.2;
  }

  .brand-panel span {
    display: block;
    margin-top: 4px;
    color: var(--iq-text-muted);
    font-size: 12px;
    line-height: 1.2;
  }

  nav {
    display: grid;
    gap: 6px;
    margin-top: 16px;
  }

  nav a {
    display: flex;
    align-items: center;
    min-height: 40px;
    padding: 0 12px;
    border-radius: 999px;
    color: var(--iq-text-muted);
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    transition: background-color 160ms ease, color 160ms ease;
  }

  nav a:hover,
  nav a.active {
    color: var(--iq-accent-strong);
    background: var(--iq-accent-soft);
  }

  .options-content {
    min-width: 0;
    padding: 4px 0 48px;
  }

  @media (max-width: 760px) {
    .options-shell {
      grid-template-columns: 1fr;
      width: min(100vw - 24px, 640px);
      gap: 16px;
      padding: 16px 0 28px;
    }

    .options-sidebar {
      position: static;
    }

    nav {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    nav a {
      justify-content: center;
    }
  }
</style>
