import LeaderBoard              from "@containers/leaderboard";

export const metadata = {
    title: 'LeaderBoard | Curateit',
    robots: {
        index: true,
        follow: true,
        nocache: true,
    },
}

const LeaderBoardPage = () => {
    return (<LeaderBoard />);
}
 
export default LeaderBoardPage;