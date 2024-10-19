<script>
    import "../app.css";
    import { signIn, signOut } from "@auth/sveltekit/client";

    // this gets the page data from the server, specifically the session from +layout.server.ts
    import { page } from "$app/stores";

    // the user session is available from the $page.data.session store from the export from +layout.server.ts 
    // console.log($page.data.session);
</script>

<div class="navbar bg-base-300 flex justify-between">
    <div class="flex items-center">
        <a class="btn btn-ghost text-xl" href="/">OAuth for Okta</a>
        <ul class="menu menu-horizontal px-1">
            <li><a class:active={$page.url.pathname === '/users'} href="/users">Users</a></li>
            <li><a class:active={$page.url.pathname === '/logs'} href="/logs">Logs</a></li>
        </ul>
    </div>
    <div class="flex-none">
        {#if $page.data.session?.user}
            <div class="dropdown dropdown-end">
                <div
                    tabindex="0"
                    role="button"
                    class="btn btn-ghost btn-circle avatar"
                >
                    {#if $page.data.session?.user.image}
                        <div class="w-10 rounded-full">
                            <img
                                alt="profile"
                                src={$page.data.session?.user.image}
                            />
                        </div>
                    {:else}
                        <div class="w-10 rounded-full bg-neutral-focus text-neutral-content">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    {/if}
                </div>
                <ul class="menu dropdown-content bg-base-100 rounded-box  p-2 shadow">
                    <li><a class="btn btn-ghost" href="/profile">Profile</a></li>
                    <!-- <li><a class="btn btn-ghost" href="/settings">Settings</a></li> -->
                    <li>
                        <button
                            class="btn btn-ghost"
                            on:click={() => signOut()}>Logout</button
                        >
                    </li>
                </ul>
            </div>
        {:else}
            <button
                class="btn btn-square btn-ghost"
                on:click={() => signIn("okta")}>Login</button
            >
        {/if}
    </div>
</div>
<main class="container px-4 py-8">
    <slot />
</main>
