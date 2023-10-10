import { useSelector } from 'react-redux';

function Under992({
  infos, creativePart, myThings, detail,
}) {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const elementToEdit = useSelector((state) => state.dashboard.elementToEdit);
  return (
    <>
      {!isOpenCreationModal && infos}
      {(elementToDisplay === null) && creativePart}
      {(elementToDisplay === null && !isOpenCreationModal) && myThings}
      {(elementToDisplay !== null && elementToEdit === null) && detail}
    </>
  );
}

Under992.defaultProps = {
  infos: null,
  creativePart: null,
  myThings: null,
  detail: null,
};

export default Under992;
