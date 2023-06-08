import React from 'react'
import './StatsStyles.css';
import { useSpring, animated } from 'react-spring';

function Number({ n }){
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}

const Stats = () => {
  return (
    <section className='stat-sec'>
      <div className='stat-container'>
        <h4 className='stat-val'>
          <Number n={3800} />+
        </h4>
        <p className='stat-title'>Users Active</p>
      </div>
      <div className='stat-container'>
        <h4 className='stat-val'>
          <Number n={230} />+
        </h4>
        <p className='stat-title'>Trusted by Company</p>
      </div>
      <div className='stat-container'>
        <h4 className='stat-val'>
          <span>$</span><Number n={230} /><span>M+</span> 
        </h4>
        <p className='stat-title'>Transaction</p>
      </div>
    </section>
  )
}

export default Stats