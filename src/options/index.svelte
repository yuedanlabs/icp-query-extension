<script lang="ts">
  import logo from "data-base64:~assets/favicon.png"
  import { Divider } from "stdf"
  import { onMount } from "svelte"

  import Options from "./Options.svelte"
  import About from "./about.svelte"

  import "~style.css"

  const components = [
    { hash: "#options", name: "Options", component: Options },
    { hash: "#about", name: "About", component: About }
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

<main class="container max-w-5xl mx-auto">
  <div class="flex py-8">
    <aside class="w-1/4">
      <nav class="space-y-4">
        <div class="header m-4">
          <img src={logo} alt="Svelte Logo" />
          <span>ICP Query</span>
        </div>
        <ul class="text-base text-slate-500 font-medium leading-relaxed">
          {#each components as component}
            <li>
              <a
                class="block py-4 focus:text-green hover:bg-teal-50 {component.hash ===
                current?.hash
                  ? 'text-green bg-teal-50'
                  : ''}"
                href={component.hash}>{component.name}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </aside>

    <div class="w-3/4">
      <svelte:component this={current?.component} />

      <!-- <div class="contact" style="margin-top: 10rem;">
        <Divider
          px="8"
          line="dashed"
          text="Notice"
          injClass="border-[#FF5722] text-[red]" />
        <p style="color: red;">
          The default API uses a trial token, just for testing.
        </p>
        <p style="color: red;">
          For a better experience, please send us an email to apply for your
          own token.
        </p>
        <div class="mt-8">
          <a
            class="border rounded-md bg-success px-6 py-3 text-white"
            href="mailto:yuedan.work@gmail.com?subject=Apply%20Token%20for%20ICP%20Query%20Extension&body=Please%20include%20your%20email%20address%20here.%0A%0AEmail%3A%20%3Cyour%20email%20address%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))"
            style="font-size: medium;">Click to Apply</a>
        </div>
      </div> -->
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 0.5rem;
    margin: 0 auto;
  }

  .header {
    display: flex;
    flex-direction: row;
    margin: auto;
    justify-content: center;
    align-items: center;
  }

  .header span {
    margin-left: 1rem;
    color: #2ee0cf;
    text-transform: uppercase;
    font-size: 1rem;
    /* font-weight: 100; */
    /* line-height: 1.1; */
    /* margin: 2rem auto; */
    max-width: 14rem;
  }
</style>
