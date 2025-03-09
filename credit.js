document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    grids.forEach((grid, index) => {
        const userId = grid.getAttribute('data-user-id');
        const discordUrl = `https://cors-proxy.htmldriven.com/?url=https://discordlookup.com/user/${userId}`;

        setTimeout(() => {
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
                });
        }, index * 500);
    });
});
