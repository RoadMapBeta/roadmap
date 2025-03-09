document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        const userId = grid.getAttribute('data-user-id');
        const discordUrl = `https://corsproxy.io/?url=https://discordlookup.com/user/${userId}`;

        fetch(discordUrl)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const avatarImage = doc.querySelector('img[src*="cdn.discordapp.com/avatars/"]');

                if (avatarImage) {
                    const avatarUrl = avatarImage.src;
                    const imgElement = grid.querySelector('.grid-img');
                    imgElement.src = avatarUrl;
                }
            })
            .catch(error => {
                console.error('Error fetching Discord data:', error);
            });
    });
});
