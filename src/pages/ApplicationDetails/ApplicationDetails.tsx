import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { fetchApplicationDetailsByName } from '../../services';
import { IAppDetails, IAppParams } from '../../types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ApplicationDetails = () => {
  const { appName } = useParams<IAppParams>();
  const [appDetails, setAppDetails] = useState<IAppDetails[]>([]);

  const options = {
    title: { text: 'Cost Analysis ' },
    xAxis: {
      title: {
        text: 'Cost ',
      },
      min: 0,
      max: 50,
    },
    yAxis: {
      min: 0,
      max: 50,
    },
    series: [
      {
        type: 'line',
        name: 'Cost',
        data: appDetails.map((appDetails) => Number(appDetails.Cost)),
      },
    ],
  };

  useEffect(() => {
    const getAppData = async () => {
      const appData = await fetchApplicationDetailsByName(appName);
      appData.sort((a: IAppDetails, b: IAppDetails) => {
        return new Date(a.Date).valueOf() - new Date(b.Date).valueOf();
      });
      setAppDetails(appData);
    };
    getAppData();
  }, [appName]);

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="page-container">
        {appDetails.map((appDetail: IAppDetails) => {
          const {
            ConsumedQuantity,
            Cost,
            Date,
            InstanceId,
            Location,
            MeterCategory,
            ResourceGroup,
            ResourceLocation,
            ServiceName,
            UnitOfMeasure,
          } = appDetail;
          return (
            <Card className="app-card" key={InstanceId}>
              <CardBody>
                <CardTitle tag="h5">{ResourceGroup}</CardTitle>
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>Meter Category : {MeterCategory}</ListGroupItem>
                <ListGroupItem>
                  Resource Location : {ResourceLocation}
                </ListGroupItem>
                <ListGroupItem>ServiceName : {ServiceName} </ListGroupItem>
                <ListGroupItem>
                  Consumed Quantity : {ConsumedQuantity}{' '}
                </ListGroupItem>
                <ListGroupItem>Cost : {Cost} </ListGroupItem>
                <ListGroupItem>Date : {Date} </ListGroupItem>
                <ListGroupItem>Location : {Location} </ListGroupItem>
                <ListGroupItem>UnitOfMeasure : {UnitOfMeasure} </ListGroupItem>
              </ListGroup>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ApplicationDetails;
