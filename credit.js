document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    const colorThief = new ColorThief();
    const repoOwner = 'RoadMapBeta';
    const repoName = 'roadmap';

    const fetchAvatarsAndCommits = async () => {
        const avatarPromises = Array.from(grids).map(async grid => {
            const h2Element = grid.querySelector('h2');
            if (!h2Element) return;

            const username = h2Element.textContent.trim();
            if (!username) return;

            const avatarUrl = `https://avatar-cyan.vercel.app/api/${username}`;
            const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?author=${username}`;

            const imgElement = grid.querySelector('.grid-img');
            if (!imgElement) return;

            const avatarResponse = await fetch(avatarUrl);
            const avatarData = await avatarResponse.json();
            h2Element.textContent = avatarData.display_name;
            imgElement.src = avatarData.avatarUrl;

            const commitsResponse = await fetch(githubApiUrl);
            const commitsData = await commitsResponse.json();
            const commitCount = commitsData.length;

            const commitBadge = document.createElement('span');
            commitBadge.textContent = commitCount;
            commitBadge.classList.add('commit-badge');
            h2Element.appendChild(commitBadge);

            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = avatarData.avatarUrl;

            await new Promise(resolve => {
                img.onload = () => {
                    const dominantColor = colorThief.getColor(img);
                    const hexColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
                    imgElement.style.border = `2px solid ${hexColor}`;
                    resolve();
                };
            });
        });

        await Promise.all(avatarPromises);
    };

    fetchAvatarsAndCommits();
});
