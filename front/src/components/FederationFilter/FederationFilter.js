import { useEffect, useState } from 'react';
import {
  Button, Col, Offcanvas, Row, Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { setSearch } from '../../actions/generalCalendar';
import '../GeneralCalendar/GeneralCalendar.scss';

function FederationFilter({ onlyChampionships }) {
  const federations = useSelector((state) => state.generalCalendar.federations);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.generalCalendar.search);

  const [showFFSA, setShowFFSA] = useState(false);

  const handleCloseFFSA = () => setShowFFSA(false);
  const handleShowFFSA = () => {
    setShowFFSA(true);
    dispatch(setSearch(null));
  };

  useEffect(() => {
    if (federations !== null) {
      setIsLoading(false);
    }
  }, [federations]);

  const [showUFOLEP, setShowUFOLEP] = useState(false);

  const handleCloseUFOLEP = () => setShowUFOLEP(false);
  const handleShowUFOLEP = () => {
    setShowUFOLEP(true);
    dispatch(setSearch(null));
  };

  const handleInputOnReactSelect = (selectedOptions, meta) => {
    if (meta.action === 'select-option') {
      const table = [];
      selectedOptions.forEach((element) => {
        if (search !== null) {
          if (!search.includes(element.value)) {
            table.push(element.value);
          }
        }
        else {
          table.push(element.value);
        }
      });
      const onSearch = search ?? [];

      const tableFin = [...onSearch, ...table];
      dispatch(setSearch(tableFin));
    }

    if (meta.action === 'remove-value') {
      dispatch(setSearch(search.filter((item) => item !== meta.removedValue.value)));
    }
  };

  const handleInputOnlyChampionships = (selectedOption) => {
    dispatch(setSearch(selectedOption.value.replace('championship[]=', '')));
  };

  const handleInputUnofficialOnlyChampionships = (event) => {
    dispatch(setSearch(event.target.value.replace('championship[]=', '')));
  };

  const handleInputUnofficial = (event) => {
    if (!search.includes(event.target.value)) {
      dispatch(setSearch([...search, event.target.value]));
    }
    else {
      dispatch(setSearch(search.filter((item) => item !== event.target.value)));
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '4px',
      boxShadow: state.isFocused ? '0 0 3px rgba(0, 0, 0, 0.3)' : 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'grey' : state.data.color,
      color: state.isFocused ? 'black' : 'inherit',
    }),
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <>
          <Row className="mb-3 " style={{ width: '100%' }}>
            {federations.map((fede) => (
              <Col size={6} key={fede.id} className="d-flex justify-content-center">
                <Button variant="primary" className="col-8" onClick={fede.alias === 'FFSA' ? handleShowFFSA : handleShowUFOLEP}>
                  {'>'} {fede.alias}
                </Button>

                <Offcanvas
                  show={fede.alias === 'FFSA' ? showFFSA : showUFOLEP}
                  onHide={fede.alias === 'FFSA' ? handleCloseFFSA : handleCloseUFOLEP}
                  placement={fede.alias === 'FFSA' ? 'start' : 'end'}
                  scroll
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{fede.alias}</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {fede.disciplines.map((discipline) => (
                      !onlyChampionships && (
                      <>
                        <div key={discipline.id} className="GeneralCalendar-Discipline">
                          <h4>{discipline.name}</h4>
                          <ReactSelect
                            placeholder="Sélectionnez..."
                            isMulti
                            isSearchable
                            isClearable={false}
                            onChange={handleInputOnReactSelect}
                            options={discipline.categories.map((cate) => ({ value: `category[]=${cate.id}`, label: cate.name }))}
                          />
                        </div>
                        <hr />
                      </>
                      )
                    ))}
                    <div className="GeneralCalendar-Discipline">
                      <h4>Championnat</h4>
                      <ReactSelect
                        styles={customStyles}
                        isClearable={false}
                        closeMenuOnSelect={onlyChampionships}
                        isMulti={!onlyChampionships}
                        isSearchable
                        onChange={onlyChampionships
                          ? handleInputOnlyChampionships : handleInputOnReactSelect}
                        options={fede.championships.map((oneChampionship) => (
                          { value: `championship[]=${oneChampionship.id}`, label: oneChampionship.name, color: oneChampionship.color }))}
                      />
                    </div>
                    <div style={{ backgroundColor: '#ffcd61' }} className="GeneralCalendar-Unofficial">

                      <label htmlFor="unofficial">
                        <input
                          type="checkbox"
                          onChange={onlyChampionships
                            ? handleInputUnofficialOnlyChampionships : handleInputUnofficial}
                          name="unofficial"
                          id="unofficial"
                          value="championship[]=0"
                        />
                        Séances non-officielles
                      </label>

                    </div>
                    <hr />
                    <Button type="button" className="col-12" onClick={fede.alias === 'FFSA' ? handleCloseFFSA : handleCloseUFOLEP}>Valider mes choix</Button>
                  </Offcanvas.Body>
                </Offcanvas>
              </Col>
            ))}
          </Row>
          <Row className="mb-3">
            <Col size={8}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  dispatch(setSearch(null));
                }}
              >Réinitialiser les filtres
              </Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

FederationFilter.defaultProps = {
  onlyChampionships: false,
};
export default FederationFilter;
