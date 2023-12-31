import { useEffect } from 'react';
import Head from 'next/head';
import Link from "next/link";
import { useLanguage } from '../stores/use-languaje';
import {getData} from '../stores/getData';
import {useAppData} from '../stores/use-app-data';

const PageBanner = ({ pageTitle, pageDesc }) => {
  const {isSpanish} = useLanguage();
  const {data, setData} = useAppData((
    {data,
    setData}
  )=>({data,
    setData}));

  useEffect(() => {
      getData('app').then((res) => {
          setData(res)
      })
  }, [])

  const styles = {
    "parallax": {
      "backgroundImage": "url(/images/pattren-3.png)"
    }
  }
  const headTitle = `${(isSpanish? data?.es: data?.en)?.settings?.siteName} - ${pageTitle}`;

  return (
    <>
      <Head>
        <title>{data ??headTitle}</title>
      </Head>
      <section className="banner-style-one">
        <div className="parallax" style={styles.parallax} />

        <div className="container">
          <div className="row">
            <div className="banner-details">
              <h2>{pageTitle}</h2>
              <p>{pageDesc}</p>
            </div>
          </div>
        </div>
        <div className="breadcrums">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <Link href="/">
                    <i className="fa-solid fa-house"></i>
                    <p>{isSpanish ? 'Inicio' :'Home'}</p>
                  </Link>
                </li>
                <li className="current">
                  <p>{pageTitle}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PageBanner;
