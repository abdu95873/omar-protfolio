import { Link, useLoaderData } from 'react-router-dom';

const AboutSection = () => {
    const loadAbout = useLoaderData();



    return (
        <div>
            <div className='m-10 bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full'>
                {
                    loadAbout.map(about =>
                        <p className="m-5"
                            key={about._id}> <div className="relative overflow-hidden col-span-3" style={{ width: '500px', height: '300px' }}>
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={about.url}
                                    title="YouTube video player"
                                    allowFullScreen
                                />
                            </div>
                            <Link to={`/dashboard/aboutSection/${about._id}`}>
                                <button className="btn btn-outline btn-primary m-5 px-5" >Edit</button>
                            </Link>
                        </p>)
                }
            </div>
        </div>
    );
};

export default AboutSection;
