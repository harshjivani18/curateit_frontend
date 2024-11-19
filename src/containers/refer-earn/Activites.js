import { Row } from 'antd'
import ActivityBlock from './ActivityBlock'


const ReferToFriends = [
    {
        category: 'Refer',
        img: 'PiMaskHappy',
        title: 'Pioneer - Invite 10 users',
        subTitle: 'Kickstart your ambassador journey by referring a new user to our platform, send email invite upto 10',
        blob: 'Referral',
        progress: 20,
        progressText: '2/10',
        icon: true,
        iconType: 'info',
        colours: {
            primary: '#347AE2',
            light: '#E5F0FF',
            text: '#235197'
        }
    },
    {
        category: 'Refer',
        img: 'PiTarget',
        title: 'Network Expander - Invite 50 users',
        subTitle: 'Introduce a new user to our services and earn credits for paving their path to us',
        blob: 'Referral',
        progress: 0,
        progressText: '0/50',
        icon: true,
        iconType: 'expand',
        colours: {
            primary: '#347AE2',
            light: '#E5F0FF',
            text: '#235197'
        }
    },
    {
        category: 'Refer',
        img: 'PiClub',
        title: 'Conversion Champion  (1 paid user)',
        subTitle: 'Turn a friend into a fellow patron! Receive credits for every user you convert to a paid membership',
        blob: 'Referral',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#347AE2',
            light: '#E5F0FF',
            text: '#235197'
        }
    },
    {
        category: 'Refer',
        img: 'PiRocketLaunch',
        title: 'Circle of Influence (6 paid users)',
        subTitle: 'Bring in six paid users and unlock exclusive rewards as a token of our gratitude',
        blob: 'Referral',
        progress: 0,
        progressText: '0/6',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#347AE2',
            light: '#E5F0FF',
            text: '#235197'
        }
    },
    {
        category: 'Refer',
        img: 'PiRocketLaunch',
        title: 'Influencer King (12 paid users)',
        subTitle: 'Turn a friend into a fellow patron! Receive credits for every user you convert to a paid membership',
        blob: 'Referral',
        progress: 0,
        progressText: '0/12',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#347AE2',
            light: '#E5F0FF',
            text: '#235197'
        }
    },

]

const EarnRewards = [
    {
        category: 'Earn',
        img: 'PiStar',
        title: 'Site Reviewer',
        subTitle: 'Write a detailed review on G2',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiChatCenteredText',
        title: 'Site Reviewer',
        subTitle: 'Write a detailed review on Capterra',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiStarFour',
        title: 'Site Reviewer',
        subTitle: 'Write a detailed review on TrustPilot',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiChecks',
        title: 'Site Reviewer',
        subTitle: 'Write a detailed review on Product Hunt',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiNewspaper',
        title: 'Tag us in Social post Text/Thread',
        subTitle: 'Initiate a dialogue about us in your text posts or threads. ',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiFrameCorners',
        title: 'Tag us in Social post/Carousel',
        subTitle: 'Tag us in your carousel posts and showcase your journey with our platform to your network.',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiFilmStrip',
        title: 'Tag us in Social post - video/reel',
        subTitle: 'Be a reel trendsetter! Feature us in your videos to share dynamic insights into our services with your followers',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiImage',
        title: 'Tag us in Social post Text/Image',
        subTitle: 'Tag us in your text and image posts to create a visual buzz around our brand',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },
    {
        category: 'Earn',
        img: 'PiLinkedinLogo',
        title: 'SEO Score',
        subTitle: 'Share your SEO score on LinkedIn',
        blob: 'Reward',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3AA8A1',
            light: '#E5F0FF',
            text: '#004440'
        }
    },


]

const Activity = [
    {
        category: 'Activity',
        img: 'PiGift',
        title: 'Install Extension',
        subTitle: 'Install the extension from Chrome webstore',
        blob: 'Activity',
        progress: 100,
        progressText: 'Completed!',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiPuzzlePiece',
        title: 'Update Profile',
        subTitle: 'Add all the details on profile including at least 3 social media accounts',
        blob: 'Activity',
        progress: 100,
        progressText: 'Completed!',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiBrowsers',
        title: 'Update Profile',
        subTitle: 'Bulk Import Bookmarks',
        blob: 'Activity',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiVideo',
        title: 'Youtube Highlighter',
        subTitle: 'Highlight youtube transcript with one click saving image and note',
        blob: 'Activity',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiImages',
        title: 'Image Highlighter',
        subTitle: 'Save image easily across the web',
        blob: 'Activity',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiTerminalWindow',
        title: 'Code Highlighter',
        subTitle: 'Highlight code easily across the web',
        blob: 'Activity',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiNote',
        title: 'PDF Highlighter',
        subTitle: 'Highlight PDF across the web or file',
        blob: 'Activity',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiShapes',
        title: 'Shortcut Maestro',
        subTitle: 'Setup and use shortend url 10 times, Leaping through web pages in a single click!',
        blob: 'Activity',
        progress: 0,
        progressText: '0/1',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiSelectionAll',
        title: 'Take 5 Screenshots',
        subTitle: 'Use screenshot feature on the app',
        blob: 'Activity',
        progress: 40,
        progressText: '2/5',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#B85197',
            light: '#FFF0F5',
            text: '#620042'
        },
    },
    {
        category: 'Activity',
        img: 'PiGlobeSimple',
        title: 'Web Highlighter',
        subTitle: 'Highlight text across the web ',
        blob: 'Activity',
        progress: 100,
        progressText: 'Claimed!',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3DAC74',
            light: '#EDFFE7',
            text: '#3DAC74'
        },
    },
    {
        category: 'Activity',
        img: 'PiSidebar',
        title: 'Tabs Master',
        subTitle: 'Saves all tabs in a session',
        blob: 'Activity',
        progress: 100,
        progressText: 'Claimed!',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#3DAC74',
            light: '#EDFFE7',
            text: '#3DAC74'
        },
    },
    {
        category: 'Activity',
        img: 'PiVinylRecord',
        title: 'Audio Explorer',
        subTitle: 'Saves all tabs in a session',
        blob: 'Activity',
        progress: 100,
        progressText: 'disabled',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#97A0B5',
            light: '#FFFFFF',
            text: '#74778B'
        },
        statusText: 'Unlocks in premium'
    },
]

const Loyalty = [
    {
        category: 'Loyalty',
        img: 'PiStarFour',
        title: '5-Day Explorer',
        subTitle: 'Use app daily for 5 days to earn this badge',
        blob: 'Loyalty',
        progress: 40,
        progressText: '2/5',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiConfetti',
        title: '20-Day Navigator',
        subTitle: 'Use app daily for 10 days to earn this badge',
        blob: 'Loyalty',
        progress: 60,
        progressText: '12/20',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiConfetti',
        title: '60-Day Vanguard',
        subTitle: 'Use app daily for 60 days to earn this badge',
        blob: 'Loyalty',
        progress: 1,
        progressText: '2/60',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiConfetti',
        title: '90-Day Champion',
        subTitle: 'Use app daily for 90 days to earn this badge',
        blob: 'Loyalty',
        progress: 2,
        progressText: '2/90',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiCrownSimple',
        title: 'Monthly Maestro',
        subTitle: 'Use app weekly for 4 weeks to earn this badge',
        blob: 'Loyalty',
        progress: 50,
        progressText: '2/4',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiCrownSimple',
        title: '8-Week Milestoner',
        subTitle: 'Use app weekly for 8 weeks to earn this badge',
        blob: 'Loyalty',
        progress: 20,
        progressText: '2/8',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiCrownSimple',
        title: '12-week Streak Sentinel ',
        subTitle: 'Use app weekly for 12 weeks to earn this badge',
        blob: 'Loyalty',
        progress: 12,
        progressText: '1/12',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiSketchLogo',
        title: 'Treasure Seeker',
        subTitle: 'Add 2000 gems',
        blob: 'Loyalty',
        progress: 8,
        progressText: '167/2000',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiSketchLogo',
        title: 'Treasure Keeper - Artisan',
        subTitle: 'Add 5000 gems',
        blob: 'Loyalty',
        progress: 1,
        progressText: '2/5,000',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiSketchLogo',
        title: 'Treasure Guardian - Master',
        subTitle: 'Add 10000 gems',
        blob: 'Loyalty',
        progress: 2,
        progressText: '212/10,000',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiFolders',
        title: 'Novice Curator - 10 ',
        subTitle: 'Created 10 collections ',
        blob: 'Loyalty',
        progress: 40,
        progressText: '4/10',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiFolders',
        title: 'Captain Curator - 100',
        subTitle: 'Created 100 collections ',
        blob: 'Loyalty',
        progress: 24,
        progressText: '24/100',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiFolders',
        title: 'Oracle Curator - 1k',
        subTitle: 'Created 1000 collections ',
        blob: 'Loyalty',
        progress: 1,
        progressText: '2/1000',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiHandshake',
        title: 'Engagement Enthusiast 100',
        subTitle: 'Over 100 interaction in community with like comments views etc',
        blob: 'Loyalty',
        progress: 22,
        progressText: '22/100',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiHandshake',
        title: 'Engagement Expert - 1k',
        subTitle: 'Over 1000 interaction in community with like comments views etc',
        blob: 'Loyalty',
        progress: 1,
        progressText: '2/1000',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
    {
        category: 'Loyalty',
        img: 'PiHandshake',
        title: 'Engagement Emperor - 10k',
        subTitle: 'Over 10000 interaction in community with like comments views etc',
        blob: 'Loyalty',
        progress: 1,
        progressText: '2/10,00',
        icon: false,
        iconType: 'info',
        colours: {
            primary: '#8C2FEA',
            light: '#EFE3FF',
            text: '#8C2FEA'
        }
    },
]

const Activities = ({ currentCategory, setCurrentCategory }) => {

    const renderActivities = (Activities) => {

        return Activities.map((data, index) => {

            return (
                <ActivityBlock
                    category={data?.category}
                    img={data?.img}
                    title={data?.title}
                    subTitle={data?.subTitle}
                    blob={data?.blob}
                    progress={data?.progress}
                    progressText={data?.progressText}
                    icon={data?.icon}
                    iconType={data?.iconType}
                    colours={data?.colours}
                    key={index}
                />
            )

        })

    }

    return (
        <div className='w-full'>
            {/* REFER */}
            {
                (currentCategory === 'All' || currentCategory === 'Refer') &&
                <div>
                    <div className='w-full'>
                        <p className='text-2xl text-grey-medium font-semibold leading-7'>
                            Refer to friends
                        </p>

                        <p className='text-sm text-grey-text-light leading-7 mt-1'>
                            Refer and earn credits. Complete small tasks and earn new credits
                        </p>
                    </div>

                    {/* // ? Activity blocks section */}
                    <Row
                        gutter={[24, 24]}
                    >
                        {
                            renderActivities(ReferToFriends)
                        }
                    </Row>
                </div>
            }


            {/* EARN */}
            {
                (currentCategory === 'All' || currentCategory === 'Earn') &&
                <div className='mt-12'>
                    <div className='w-full'>
                        <p className='text-2xl text-grey-medium font-semibold leading-7'>
                            Earn Rewards
                        </p>

                        <p className='text-sm text-grey-text-light leading-7 mt-1'>
                            Complete small tasks and earn new rewards.
                        </p>
                    </div>

                    {/* // ? Activity blocks section */}
                    <Row
                        gutter={[24, 24]}
                    >
                        {
                            renderActivities(EarnRewards)
                        }
                    </Row>
                </div>
            }

            {/* ACTIVITY */}
            {
                (currentCategory === 'All' || currentCategory === 'Activity') &&
                <div className='mt-12'>
                    <div className='w-full'>
                        <p className='text-2xl text-grey-medium font-semibold leading-7'>
                            Activity Credits
                        </p>

                        <p className='text-sm text-grey-text-light leading-7 mt-1'>
                            Refer and earn credits. Complete small tasks and earn new credits
                        </p>
                    </div>

                    {/* // ? Activity blocks section */}
                    <Row
                        gutter={[24, 24]}
                    >
                        {
                            renderActivities(Activity)
                        }
                    </Row>
                </div>
            }

            {/* LOYALTY */}
            {(currentCategory === 'All' || currentCategory === 'Loyalty') &&
                <div className='mt-12'>
                    <div className='w-full'>
                        <p className='text-2xl text-grey-medium font-semibold leading-7'>
                            Loyalty Credits
                        </p>

                        <p className='text-sm text-grey-text-light leading-7 mt-1'>
                            Refer and earn credits. Complete small tasks and earn new credits
                        </p>
                    </div>

                    {/* // ? Activity blocks section */}
                    <Row
                        gutter={[24, 24]}
                    >
                        {
                            renderActivities(Loyalty)
                        }
                    </Row>
                </div>
            }

        </div>
    )

}

export default Activities