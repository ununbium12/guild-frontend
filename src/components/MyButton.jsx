import '../App.css';

const MyButton = ({text, type, onClick}) => {

  const btnType = ['positive', 'negative', 'login','mypage', 'logout', 'editPost'].includes(type)? type:'default';

  return (
    <button 
      className={["MyButton", `MyButton_${btnType}`].join(" ")} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;