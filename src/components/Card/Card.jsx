import './styles.css'

export default function Card({name, time}) {
    return (
        <div className='card'>
            <strong>{name}</strong>
            <strong>{time}</strong>
        </div>
    )
}
