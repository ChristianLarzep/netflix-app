import { useLocation } from 'react-router-dom';

import { ArrowBackOutlined } from '@material-ui/icons';

import './styles.scss';

export default function Watch() {
  const { state: { movie } } = useLocation();

  return (
    <div className='watch'>
      <div className='back'>
       <ArrowBackOutlined />
       Home
      </div>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src={movie.video}
      />
    </div>
  )
}
