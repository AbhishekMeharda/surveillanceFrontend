import { useState, useEffect } from 'react';
import IndiaMap from '@svg-maps/india';
import { SVGMap } from 'react-svg-map';
import 'react-svg-map/lib/index.css';
import DynamicTable from './components/DynamicTable';
import './App.css';
import Cart from "./components/cart.jsx";

const organisationColumns = ['id', 'name', 'shortcode'];
const siteColumns = ['id', 'name', 'latitude', 'longitude', 'parentOrgId'];
const sampleColumns = ['type', 'subtype', 'barcode', 'visitId'];
const visitColumns = ['id', 'diseases', 'date', 'parentSiteId'];

function App() {
    const [organisationData, setOrganisationData] = useState([]);
    const [siteData, setSiteData] = useState([]);
    const [sampleData, setSampleData] = useState([]);
    const [visitData, setVisitData] = useState([]);

    useEffect(() => {
        fetch('  http://127.0.0.1:5000/api/organisation')
            .then(response => response.json())
            .then(data => setOrganisationData(data))
            .catch(error => console.error('Error fetching organisation data:', error));

        fetch(' http://127.0.0.1:5000/api/site')
            .then(response => response.json())
            .then(data => setSiteData(data))
            .catch(error => console.error('Error fetching site data:', error));

        fetch(' http://127.0.0.1:5000/api/sample')
            .then(response => response.json())
            .then(data => setSampleData(data))
            .catch(error => console.error('Error fetching sample data:', error));

        fetch(' http://127.0.0.1:5000/api/visit')
            .then(response => response.json())
            .then(data => setVisitData(data))
            .catch(error => console.error('Error fetching visit data:', error));
    }, []);

    return (
        <>
            <div className="dashboard">
                <div className="dashboard_header">
                    <div className="state">
                        <h2>India</h2>
                    </div>
                    <div className="date">
                        <span>
                          Date:
                          <input type="date" />
                        </span>
                    </div>
                </div>
                <div className="dashboard_content">
                    <div className="map">
                        <SVGMap className="svg-map" map={IndiaMap} />
                    </div>
                    <div className="data">
                        <div className="summary">
                            <Cart label="ORGANISATION" value={organisationData.length}/>
                            <Cart label="SITES" value={siteData.length}/>
                            <Cart label="VISITS" value={visitData.length}/>
                            <Cart label="SAMPLES" value={sampleData.length}/>
                        </div>
                        <div className="table">
                            <DynamicTable data={organisationData} columns={organisationColumns}/>
                        </div>
                        <div className="table">
                            <DynamicTable data={visitData} columns={visitColumns}/>
                        </div>
                    </div>
                </div>
                <div className="tables">
                    <div className="table1">
                        <DynamicTable data={sampleData} columns={sampleColumns} />
                    </div>
                    <div className="table2">
                        <div className="table">
                            <DynamicTable data={siteData} columns={siteColumns} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;