<script>
  let dinosaurs = [
    'dinosaur1',
    'dinosaur2',
    'dinosaur3',
    'dinosaur4',
    'dinosaur5',
  ]
    
  let currentWidth = 0;
  // have the array updated when currentWidth updates
  $: dinosToShow = render(currentWidth);
    
  function render(currentWidth) {
    // Early return
    if (currentWidth == 0) return [];
        
    let i = 0;
    let sumWidth = 0;

    // While instead of for, removes the need for breaks        
    while(i < dinosaurs.length && sumWidth < currentWidth) {
      // Create a dummy span and add it somewhere far off screen
      let span = document.createElement('span')
      span.classList.add('dinosaur')
      span.textContent = `${dinosaurs[i]},\xa0`
      span.style = "visibility: hidden; position: fixed; top: -1000;";
      document.body.appendChild(span);
      // Sum the width of the dummy elements
      sumWidth += span.getBoundingClientRect().width
      // Remove the dummy again
      document.body.removeChild(span)
    
      // if the sum with the dummy is less than the current width do i + 1
      // this will effectively include this dino in the list
      if (sumWidth < currentWidth) {
        i++
      }
    }

   // return the subarray that fits.
   // note that if sumWidth > currentWidth this will NOT include the dino that was too big  
   return dinosaurs.slice(0, i)
  }
</script>

<div class="display" bind:clientWidth={currentWidth}>
  {#each dinosToShow as r}
    <!-- No binding of stuff here -->
    <span class="dinosaur">{r}</span>
  {/each}
</div>

<style>
  .display {
      overflow: hidden;
  }
  .dinosaur {
    display: inline-block;
  }
</style>

