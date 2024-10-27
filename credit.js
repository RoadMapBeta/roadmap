document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        const userId = grid.getAttribute('data-user-id');
        const avatarHash = grid.querySelector('.grid-img').getAttribute('alt'); 

     
        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=1024`;
        
       
        const imgElement = grid.querySelector('.grid-img');
        imgElement.src = avatarUrl;

        
        imgElement.alt = avatarHash; 
    });
});
