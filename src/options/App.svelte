<script lang="ts">
    import logo from "../assets/favicon.png";
    import Options from "./Options.svelte";
</script>

<main>
    <div class="header">
        <img src={logo} alt="Svelte Logo" style="" />
        <span>ICP Query</span>
    </div>

    <Options />

    <div class="contact" style="margin-top: 10rem;">
        <p style="color: red;font-size: large;">Notice:</p>
        <p style="color: red;">The default API uses a trial token, which is only used for testing and when the usual usage is not large.</p>
        <p style="color: red;">For a good experience, please click the link below to send an email to apply for your exclusive token.</p>
        <a href="mailto:yuedan.work@gmail.com?subject=Apply%20Token%20for%20ICP%20Query%20Extension&body=Please%20include%20your%20email%20address%20here.%0A%0AEmail%3A%20%3Cyour%20email%20address%3E%0A%0A%23%20In%20addition%2C%20you%20can%20also%20write%20something%20else%20to%20the%20developer%20(of%20course%20this%20is%20optional))" style="font-size: medium;">Send mail to apply for your own token</a>
    </div>
</main>

<style>
    :root {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
