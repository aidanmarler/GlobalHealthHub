<script lang="ts">
	import Tutorial from './tutorial.svelte';

	let {
		helpOpen = $bindable(),
		beginLoadingMap = $bindable()
	}: {
		helpOpen: boolean;
		beginLoadingMap: boolean;
	} = $props();
</script>

<button
	onclick={() => {
		helpOpen = false;
		beginLoadingMap = true;
	}}
	class="absolute right-5 top-4 h-12 w-12
		rounded-full border-2 border-transparent bg-white p-0.5 shadow-sm shadow-neutral-900 outline-offset-2
		outline-blue-500 hover:border-blue-500 hover:shadow-md hover:shadow-neutral-900"
>
	<img
		alt="Close Help Page"
		class="inline h-full w-full invert"
		src="/icons/interaction/close.svg"
	/>
</button>

<div
	class="h-full w-full overflow-auto border border-neutral-700 bg-neutral-50 bg-opacity-100 shadow-sm shadow-999"
>
	<div class="mt-16 w-full items-center text-center">
		<h3 class="text-2xl font-extralight">Colorado School of Public Health's</h3>
		<h1 class="mb-5 text-5xl font-bold">Global Health Hub</h1>
		<!--<p class="italic">Explore the world of public health *</p>-->
		<button
			class="mb-16 rounded-full border-2 border-transparent bg-white p-2 px-5 text-xl
				font-semibold text-black shadow-sm shadow-neutral-900 outline-offset-2 outline-blue-500
	  		  hover:border-blue-500 hover:underline hover:shadow-md hover:shadow-neutral-900"
			onclick={() => {
				helpOpen = false;
				beginLoadingMap = true;
			}}>Click here to begin!</button
		>

		<div class="mb-10 w-full px-4 text-left sm:px-12 md:px-16 lg:px-44 xl:px-64">
			<div class=" border p-4 py-8 border-neutral-300">
				<h3 class="mb-14 mt-5 w-full text-center text-3xl">Tutorial</h3>
				<!--Pan and Zoom-->
				<Tutorial img={{ path: 'pan.png', alt: 'Drag Scroll', fullWidth: false }}>
					<div class="mb-2 w-full">
						Pan around the map by pressing the Left Mouse Button <img
							alt="Left Click"
							class="inline h-6 w-6 invert"
							src="/icons/tutorial/leftClick.svg"
						/>
						and dragging. <br />
						Use the Scroll Wheel
						<img
							alt="Scroll Wheel"
							class="inline h-6 w-6 invert"
							src="/icons/tutorial/scroll.svg"
						/> to zoom in and out.
					</div>
				</Tutorial>
				<!--Click Projects-->
				<Tutorial img={{ path: 'click.png', alt: 'Drag Scroll', fullWidth: false }}>
					<div class="mb-2">Click a project to learn more about it!</div>
				</Tutorial>
				<!--Read about Projects-->
				<Tutorial img={{ path: '01_drag-scroll.png', alt: 'Drag Scroll', fullWidth: false }}>
					<div class="mb-2">
						Read about the project, including what its mission is, who is best to contact, which
						organization funds it, and more!
					</div>
				</Tutorial>
				<hr class="mb-5 border-aaa" />
				<!--Nav Bar intro-->
				<Tutorial img={{ path: 'searchbar.png', alt: 'Navigation Bar', fullWidth: true }}>
					<div>
						Use the <span class="font-medium">Navigation Bar</span> to navigate around the the full database
						of projects, countries, and more.
					</div>
				</Tutorial>
				<!--Nav Arrows-->
				<Tutorial img={null}>
					<div>
						Use the <span class="font-medium">Left</span>
						<img
							alt="Left"
							class="inline h-7 w-7 opacity-80 invert"
							src="/icons/interaction/arrowLeft.svg"
						/>
						and <span class="font-medium">Right</span>
						<img
							alt="Rignt"
							class="inline h-7 w-7 rotate-180 opacity-80 invert"
							src="/icons/interaction/arrowLeft.svg"
						/> Arrows to navigate backward and forward between past navigations - think of this like
						the arrows in your browser.
					</div>
				</Tutorial>
				<!--Globe button-->
				<Tutorial img={null}>
					<div class="w-full">
						Click the Globe Button <img
							alt="Globe"
							class="inline h-7 w-7 opacity-80 invert"
							src="/icons/category/globe.svg"
						/>
						to return to the <span class="font-medium">Global Summary</span>.
					</div>
				</Tutorial>
				<!--Search Bar-->
				<Tutorial img={null}>
					<div>
						Use the <span class="font-medium">Search Bar</span><img
							alt="search"
							class="inline h-7 w-7 opacity-80 invert"
							src="/icons/interaction/search.svg"
						/>
						to find Projects<img
							alt="point"
							class="inline h-5 w-7 opacity-70 invert"
							src="/icons/category/point.svg"
						/>, Contacts<img
							alt="person"
							class="inline h-5 w-7 opacity-70 invert"
							src="/icons/category/person.svg"
						/>, Countries<img
							alt="flag"
							class="inline h-5 w-7 opacity-70 invert"
							src="/icons/category/flag.svg"
						/>, Colleges<img
							alt="school"
							class="inline h-5 w-7 opacity-70 invert"
							src="/icons/category/school.svg"
						/>, and Missions<img
							alt="target"
							class="inline h-5 w-7 opacity-70 invert"
							src="/icons/category/target.svg"
						/>
					</div>
				</Tutorial>
				<!--Download and help-->
				<Tutorial img={null}>
					<div>
						Click <img
							alt="CSV"
							class="inline h-7 w-7 opacity-80 invert"
							src="/icons/interaction/database.svg"
						/>
						to download the data for yourself, or click
						<img
							alt="Help"
							class="inline h-7 w-7 opacity-80 invert"
							src="/icons/interaction/help.svg"
						/> to come back here!
					</div>
				</Tutorial>
				<hr class="mb-5 border-aaa" />
				<Tutorial img={{ path: 'projects.png', alt: 'Projects Table', fullWidth: true }}>
					<div class="mb-2">
						Finally, by scrolling down, you can always see all associated projects in a table with
						its five key attributes of Project Title, Contacts, Countries, College, and Mission.
					</div>
				</Tutorial>
			</div>
		</div>
		<!--onmouseenter={() => {
				beginLoadingMap = true;
			}}
			onfocus={() => {
				beginLoadingMap = true;
			}}-->
		<button
			class="mb-16 rounded-full border-2 border-transparent bg-white p-2 px-5 text-xl font-semibold text-black shadow-sm shadow-999 hover:border-blue-500 hover:underline hover:shadow hover:shadow-999"
			onclick={() => {
				helpOpen = false;
				beginLoadingMap = true;
			}}>Click here to begin!</button
		>
		<!--Footer-->
		<br class="mb-4" />
		<div class="flex w-full justify-around">
			<img alt="Close Help Page" class="mb-20 h-full w-52" src="/icons/branding/CSPH_simple.png" />
		</div>
	</div>
</div>
