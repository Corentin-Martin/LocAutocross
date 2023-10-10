import { useSelector } from 'react-redux';

function Under992({
  infos, creativePart, myThings, detail,
}) {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const elementToEdit = useSelector((state) => state.dashboard.elementToEdit);
  return (
    <div className="Vehicles-under992">
      {!isOpenCreationModal && infos}
      {(elementToDisplay === null) && creativePart}
      {(elementToDisplay === null && !isOpenCreationModal) && myThings}
      {(elementToDisplay !== null && elementToEdit === null) && detail}
    </div>
  );
}

export default Under992;
