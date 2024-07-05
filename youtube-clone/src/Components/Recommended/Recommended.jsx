import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=45&videoCategoryId=${categoryId}&key=${API_KEY}`;
        try {
            const response = await fetch(relatedVideo_url);
            const data = await response.json();
            console.log(data); // Logging the response data for debugging
            if (data.items) {
                setApiData(data.items);
            } else {
                setError('No data found');
                setApiData([]); // Ensure apiData is set to an empty array if no data is found
            }
        } catch (error) {
            setError('Error fetching data');
            console.error("Error fetching data: ", error);
            setApiData([]); // Ensure apiData is set to an empty array in case of error
        }
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="recommended">
            {apiData.length > 0 ? (
                apiData.map((item, index) => (
                    <Link to ={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} views</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading videos...</p> // Provide feedback when loading
            )}
        </div>
    );
};

export default Recommended;
