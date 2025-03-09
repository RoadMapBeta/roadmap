document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');

    const fetchAvatarWithTimeout = (url, timeout = 5000) => {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject('Timeout'), timeout);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    clearTimeout(timer);
                    resolve(data);
                })
                .catch(error => {
                    clearTimeout(timer);
                    reject(error);
                });
        });
    };

    const loadAvatars = async () => {
        const avatarPromises = Array.from(grids).map(async grid => {
            const userId = grid.getAttribute('data-user-id');
            const avatarUrl = `https://avatar-cyan.vercel.app/api/${userId}`;

            try {
                const data = await fetchAvatarWithTimeout(avatarUrl);

                const imgElement = grid.querySelector('.grid-img');
                const avatarImage = data.avatarUrl;

                imgElement.src = avatarImage;

                const colorThief = new ColorThief();
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = avatarImage;

                img.onload = () => {
                    const dominantColor = colorThief.getColor(img);
                    const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                    imgElement.style.border = `2px solid ${hexColor}`;
                };

                img.onerror = () => {
                    console.error(`Failed to load image: ${avatarImage}`);
                };
            } catch (error) {
                console.error(`Error fetching avatar for user ${userId}:`, error);
            }
        });

        await Promise.all(avatarPromises);

        grids.forEach(grid => {
            grid.style.opacity = 1;
        });
    };
    grids.forEach(grid => grid.style.opacity = 0);
    
    loadAvatars();
});
