import './Button.css';

export default function Button({ onClick, text, isDisabled }) {

    return (
        <div onClick={isDisabled ? null : onClick} className='button'>
            {text}
        </div>
    );
}

