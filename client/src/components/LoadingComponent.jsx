import LoadingIcon from "../assets/icons/loading2.svg";

const LoadingComponent = () => {
  return (
    <div className="loading-icon">
      <img src={LoadingIcon} /> <span>Loading</span>
    </div>
  );
};

export default LoadingComponent;
