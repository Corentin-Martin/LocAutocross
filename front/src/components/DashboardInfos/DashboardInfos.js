import { Card } from 'react-bootstrap';

function DashboardInfos({ childComponent }) {
  return (
    <div className="mt-3 text-center" style={{ flexGrow: '1' }}>
      <Card style={{ width: '100%', height: '100%' }} className="d-flex justify-content-center align-items-center">
        {childComponent}
      </Card>
    </div>
  );
}

export default DashboardInfos;
