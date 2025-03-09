document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach((grid, index) => {
        const userId = grid.getAttribute('data-user-id');
        const discordUrl = `https://discordlookup.com/user/${userId}`;

        setTimeout(() => {
            fetch(`https://proxy.cors.sh/${discordUrl}`, {
                headers: {
                    'x-cors-api-key': 'temp_7e448003221e768219c07398e73b8f71'
                }
            })
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
        }, index * 500);
    });
});
