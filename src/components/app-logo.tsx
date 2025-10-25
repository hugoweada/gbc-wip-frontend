import WebsiteIcon from '/public/favicon/google.png';

const AppLogo = ({size}: { size: string | number }) => {
  return <img src={WebsiteIcon} alt="logo" style={{width: size, height: size}}/>;
};

export default AppLogo;
