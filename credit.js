document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();

    const fetchAvatars = async () => {
        const avatarPromises = Array.from(grids).map(grid => {
            const userId = grid.getAttribute('data-user-id');
            const cachedAvatarUrl = localStorage.getItem(`avatarUrl_${userId}`);

            const avatarUrl = `https://avatar-cyan.vercel.app/api/${userId}`;

            return fetch(avatarUrl)
                .then(response => response.json())
                .then(data => {
                    const newAvatarUrl = data.avatarUrl;
                    const imgElement = grid.querySelector('.grid-img');

                    if (cachedAvatarUrl !== newAvatarUrl) {
                        imgElement.src = newAvatarUrl;
                        localStorage.setItem(`avatarUrl_${userId}`, newAvatarUrl);
                    } else {
                        imgElement.src = cachedAvatarUrl;
                    }

                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.src = newAvatarUrl;

                        img.onload = () => {
                            const dominantColor = colorThief.getColor(img);
                            const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                            imgElement.style.border = `2px solid ${hexColor}`;
                            resolve();
                        };

                        img.onerror = () => reject(`Failed to load image: ${newAvatarUrl}`);
                    });
                })
                .catch(error => {
                    console.error(`Error fetching avatar for user ${userId}:`, error);
                });
        });

        await Promise.all(avatarPromises);
    };

    fetchAvatars();
});
