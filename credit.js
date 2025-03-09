document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();
    const repoOwner = 'RoadMapBeta';
    const repoName = 'roadmap';

    const fetchAvatarsAndCommits = async () => {
        const avatarPromises = Array.from(grids).map(async grid => {
            const userId = grid.getAttribute('data-user-id');
            const avatarUrl = `https://avatar-cyan.vercel.app/api/${userId}`;
            const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?author=${userId}`;

            try {
                const avatarResponse = await fetch(avatarUrl);
                const avatarData = await avatarResponse.json();
                const imgElement = grid.querySelector('.grid-img');
                const h2Element = grid.querySelector('h2');

                if (h2Element) {
                    h2Element.textContent = avatarData.display_name;
                }
                imgElement.src = avatarData.avatarUrl;

                const commitsResponse = await fetch(githubApiUrl);
                const commitsData = await commitsResponse.json();
                const commitCount = commitsData.length;

                const commitBadge = document.createElement('span');
                commitBadge.textContent = commitCount;
                commitBadge.classList.add('commit-badge');
                h2Element.appendChild(commitBadge);

                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.src = avatarData.avatarUrl;

                    img.onload = () => {
                        const dominantColor = colorThief.getColor(img);
                        const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                        imgElement.style.border = `2px solid ${hexColor}`;
                        resolve();
                    };

                    img.onerror = () => reject();
                });
            } catch (error) {
                console.error(`Error fetching data for user ${userId}:`, error);
            }
        });

        await Promise.all(avatarPromises);
    };

    fetchAvatarsAndCommits();
});
