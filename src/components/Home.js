const Home = () => {

    return (
        <div id="home-container">
            <div id="greeting">Welcome to the Photo Tagging Speed Run</div>
            <div>Check Out Previous Users High Scores</div>

            <div id="leaderboards-container">
                <div id="leaderboard-easy">
                    easy leaderboard
                    <ol>
                        <li>score</li>
                        <li>score</li>
                        <li>score</li>
                    </ol>
                </div>
                <div id="leaderboard-medium">
                    medium leaderboard
                    <ol>
                        <li>score</li>
                        <li>score</li>
                        <li>score</li>
                    </ol>
                </div>
                <div id="leaderboard-hard">
                    hard leaderboard
                    <ol>
                        <li>score</li>
                        <li>score</li>
                        <li>score</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default Home;