import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardComponent from '../../components/CardComponent/CardComponent';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import { setElementToDisplay } from '../../actions/dashboard';
import MyInfosComponent from '../../components/CardComponent/MyInfosComponent/MyInfosComponent';

function Profil() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(setElementToDisplay(user));
  }, []);
  return (
    <GeneralLayout
      title="Mon profil"
      pageTitle="Mon profil"
      childComponent={<CardComponent childComponent={<MyInfosComponent />} />}
    />
  );
}

export default Profil;
