'use client'
import axios from 'axios';
//COMPONENT
import Themeswitcher from './component/Themeswitcher';
import Searchcard from './component/Searchcard';
import Details from './component/Details';
import Moresug from './component/Moresug';
import Longforcast from './component/Longforcast';

import Dayforcastdata from '../data/Dayforcast.json'
import Longforcastdata from '../data/Longforcast.json'
import { useEffect } from 'react';

export default function page() {
  const country = 'US'; // Set the country code for the United States
  const url = `http://api.geonames.org/searchJSON?country=${country}&featureClass=P&maxRows=1&username=percyarrey`;

  useEffect(()=>{
    (
      async()=>{
        console.clear()
/*         const apiKey = '<your_api_key>';
const country = 'United States';

// Use the Geocoding API to retrieve the place ID for the country
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${country}&key=${apiKey}`;

fetch(geocodeUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const placeId = data.results[0].place_id;

    // Use the Places API to retrieve the country name
    const placesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name&key=${apiKey}`;

    fetch(placesUrl)
      .then(response => response.json())
      .then(data => {
        const countryName = data.result.name;
        console.log(countryName);
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));
 */


          }
    )()
  })
  
  return (
    <section className='lg:pe-16'>
      {/* HEADER */}
      <div className='flex gap-1 rounded-2xl pt-2'>
      <div className='md:w-8/12 lg:w-8/12 w-10/12 min-h-[2.5rem]'>
          <input className='w-full h-full shadow-sm focus:shadow-lg bg-slate-200 bg-opacity-30 rounded-md border-2 border-slate-300 border-opacity-30 dark:placeholder:text-gray-100 dark:placeholder:text-opacity-50 ' placeholder='Search city'/>
      </div>
      <div className=' flex-1'>
        <Themeswitcher/>
      </div>
      </div>
      {/* BODY */}
      <h1 className=' mt-2 text-black dark:text-white dark:text-opacity-70 font-semibold text-opacity-50'>LATEST SEARCHES</h1>
      <div className='md:flex gap-6 w-full'>
        <div className='w-full pt-2  md:w-8/12 lg:w-8/12'>
          <Searchcard/>
          <Searchcard/>
          <Searchcard/>
        </div>
        <div className='w-full md:w-4/12 lg:w-4/12'>
          <Details/>
        </div>
      </div>

      {/* MORE SUGGESTION */}
      <h1 className=' mt-2 text-black dark:text-white dark:text-opacity-70 font-semibold text-opacity-50'>MORE SUGGESTION</h1>
      <div className='md:flex gap-6 w-full'>
        <div className='w-full pt-2 flex gap-2 md:w-8/12 lg:w-8/12'>
          <Moresug/>
          <Moresug/>
        </div>
        <div className='w-full md:w-4/12 lg:w-4/12'>
          <h1 className=' mt-1 text-black dark:text-white dark:text-opacity-70 font-semibold text-opacity-50'>6 DAYS FORECAST</h1>
          <Longforcast/>
          <Longforcast/>
          <Longforcast/>
        </div>
      </div>
    </section>
  );
}

