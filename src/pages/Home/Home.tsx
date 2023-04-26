import React, { FunctionComponent, useEffect, useState } from 'react';
import { fetchAllApplications } from '../../services';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

const Home: FunctionComponent = () => {
  const [applications, setApplications] = useState<string[]>([]);

  useEffect(() => {
    const getAllApplications = async () => {
      const appData = await fetchAllApplications();
      setApplications(appData);
    };
    getAllApplications();
  }, []);

  return (
    <div>
      <h1>Applications</h1>
      <div className="page-container">
        {applications.map((app: string) => {
          console.log(app);
          return (
            <Link to={`app/${app}`} key={app}>
              <Card className="app-card">
                <CardBody>
                  <CardTitle tag="h5">{app}</CardTitle>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
