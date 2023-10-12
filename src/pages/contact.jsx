import { useEffect } from "react";
import PageBanner from "@components/PageBanner";
import Layouts from "@layouts/Layouts";
import {getData} from '../stores/getData';
import { useLanguage } from "../stores/use-languaje";
import {useAppData} from '../stores/use-app-data';
import { Formik } from 'formik';

const Contact = () => {
    const {isSpanish} = useLanguage();

    const {about, setAbout} = useAppData((
		{about, setAbout}
	  )=>({about, setAbout}));
	
	  useEffect(() => {
		  getData('about').then((res) => {
			  setAbout(res)
		  })
	  }, []);

      const appAboutLanguage = about ? (isSpanish ? about.es : about.en) : {};

  return (
    <Layouts>
        <PageBanner pageTitle={ appAboutLanguage?.title } pageDesc={appAboutLanguage?.description} />

        {/* Contact Form 2 Start */}
        <section className="gap contact-form-2">
            <div className="container">
            <div className="row">
                <div className="col-lg-7" >
                    <div className="data">
                        <span>{appAboutLanguage?.contact?.introduction}</span>
                        <h2>{appAboutLanguage?.contact?.title}</h2>
                        <p>{appAboutLanguage?.contact?.description}</p>
                        <Formik
                        initialValues = {{ email: '', name: '', subject: '', message: '' }}
                        validate = { values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit = {( values, { setSubmitting } ) => {
                            const form = document.getElementById("contactForm");
                            const status = document.getElementById("contactFormStatus");
                            const data = new FormData();

                            data.append('name', values.name);
                            data.append('subject', values.subject);
                            data.append('email', values.email);
                            data.append('message', values.message);

                            fetch(form.action, {
                                method: 'POST',
                                body: data,
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }).then(response => {
                                if (response.ok) {
                                    status.innerHTML = "Thanks for your submission!";
                                    form.reset()
                                } else {
                                    response.json().then(data => {
                                        if (Object.hasOwn(data, 'errors')) {
                                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                                        } else {
                                            status.innerHTML = "Oops! There was a problem submitting your form"
                                        }
                                    })
                                }
                            }).catch(error => {
                                status.innerHTML = "Oops! There was a problem submitting your form"
                            });

                            setSubmitting(false);
                        }}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                        <form onSubmit={handleSubmit} id="contactForm" action={appAboutLanguage?.settings?.formspreeURL}>
                            <div className="row g-0">
                                <textarea 
                                  name="message" 
                                  placeholder={appAboutLanguage?.contact?.form?.message}
                                  required="required"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.message}
                                />
                            </div>
                            <div className="row g-0">
                                <input 
                                  type="text"
                                  name="name" 
                                  className="form-control"
                                  id="exampleInputText1" 
                                  placeholder={appAboutLanguage?.contact?.form?.name}
                                  required="required" 
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.name} 
                                />
                            </div>
                            <div className="row g-0">
                                <input 
                                  type="email" 
                                  className="form-control" 
                                  id="exampleInputEmail1" 
                                  placeholder={appAboutLanguage?.contact?.form?.email}
                                  name="email"
                                  required="required"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email} 
                                />
                            </div>
                            <div className="row g-0">
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  id="exampleInputPassword1" 
                                  placeholder={appAboutLanguage?.contact?.form?.subject}
                                  name="subject"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.subject} 
                                />
                            </div>
                            <button type="submit" className="theme-btn">{appAboutLanguage?.contact?.form?.button}<i className="fa-solid fa-angles-right" /></button>
                            
                            <div className="form-status" id="contactFormStatus" />
                        </form>
                        )}
                        </Formik>
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1" >
                <div className="bio">
                    <div className="data">
                        <figure>
                            <img className="author" src="/img/PabloCEO.jpeg" alt="Bio Image" />
                        </figure>
                        <h3>Pablo Recinos</h3>
                        <p>CCO <br />Global Dynamic CORP</p>
                        <figure>
                            <img src="/img/signature.png" alt="Signature Image" />
                        </figure>
                    </div>
                </div>
                <div className="info">
                    <ul className="contact">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="79" height="94" viewBox="0 0 79 94"> <defs> <clipPath id="clip-location_Bd"> <rect width="79" height="94"/> </clipPath> </defs> <g id="location_Bd" data-name="location B" clipPath="url(#clip-location_B)"> <path id="Path_1gfhjfjytkd" data-name="Path 1" d="M962.855,575.375a3,3,0,0,1-2.1-.861l-26.263-25.826c-11.03-11.993-13.791-27.653-7.492-42a38.334,38.334,0,0,1,34.959-23.117l1.346.009c15.262,0,27.868,8.452,33.722,22.609,6.152,14.878,3.046,31.554-7.912,42.485-.528.555-24.064,25.75-24.064,25.75a3,3,0,0,1-2.129.951Zm-.9-85.8A31.924,31.924,0,0,0,932.49,509.1c-5.313,12.1-2.954,25.342,6.31,35.419l23.963,23.559c15.027-16.085,20.179-21.585,22.274-23.488l-.164-.165c9.233-9.209,11.825-23.318,6.605-35.944a29.677,29.677,0,0,0-28.177-18.9Z" transform="translate(-922.725 -482.15)"/> <path id="Path_24cr2r" data-name="Path 2d" d="M15,6a9,9,0,1,0,9,9,9.01,9.01,0,0,0-9-9m0-6A15,15,0,1,1,0,15,15,15,0,0,1,15,0Z" transform="translate(25 26)"/> </g> </svg>
                            <div>
                                <h3>{appAboutLanguage?.contact?.address}</h3>
                                <p>23 calle 14-58 zona 4 de Mixco, Condado Naranjo, Pent-House Edificio Crece Torre 1, Oficina 1104 (GT)</p>
                            </div>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" height="62" viewBox="0 0 40 62"> <defs> <clipPath id="fsddffsdfsdfsdf"> <rect width="40" height="62"/> </clipPath> </defs> <g id="Mobsfddfsdile" clipPath="url(#fsddffsdfsdfsdf)"> <path id="Pafdth_1dfhgfhgjjdfhgddffgdfgdfgdfgdfgd" data-name="Path 1" d="M10,6a4,4,0,0,0-4,4V50a4,4,0,0,0,4,4H28a4,4,0,0,0,4-4V10a4,4,0,0,0-4-4H10m0-6H28A10,10,0,0,1,38,10V50A10,10,0,0,1,28,60H10A10,10,0,0,1,0,50V10A10,10,0,0,1,10,0Z" transform="translate(1 1)"/> <path id="Padfth_2" data-name="Path 2" d="M2.5,0h7a2.5,2.5,0,0,1,0,5h-7a2.5,2.5,0,0,1,0-5Z" transform="translate(14 48)"/> </g></svg>
                            <div>
                                <h3>{appAboutLanguage?.contact?.telephone}</h3>
                                <p>Tel:   (+502) 5595-7883</p>
                                <p>Fax:  (+502) 2215-7376</p>
                            </div>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="102" height="93" viewBox="0 0 102 93"> <defs> <clipPath id="clip-Emaidl_Bhf"> <rect width="102" height="93"/> </clipPath> </defs> <g id="Emaidfgsdl_B" data-name="Email B" clipPath="url(#clip-Email_Bsdfhf)"> <path id="Pathsdf_1" data-name="Path 1" d="M969.85,550.4,927.766,528.2l2.8-5.307,39.229,20.7,37.712-20.677,2.885,5.261Z" transform="translate(-918 -492)"/> <path id="Path_2dfsdsffgs" data-name="Path 2" d="M969.562,494.385l48.391,25.361,0,1.818c-.023,17.272-.043,42.814-.012,47.124l.012.024v.709c0,5.426-1.516,9.425-4.508,11.885a10.4,10.4,0,0,1-6.575,2.344l-75.5-.016c-3.557.071-5.965-.931-7.717-2.752-2.4-2.5-3.517-6.391-3.317-11.577l.065-1.194c.116-5.315.029-29.954-.067-46.535l-.011-1.842Zm42.386,28.988-42.411-22.227-43.2,22.238c.189,32.939.239,42.8-.143,46.148l.13.005c-.168,4.351.8,6.309,1.645,7.185a3.342,3.342,0,0,0,2.458.984l76.043-.071a4.65,4.65,0,0,0,3.16-.963c1.517-1.248,2.319-3.754,2.319-7.25h.09C1011.893,566.689,1011.9,557.566,1011.947,523.373Z" transform="translate(-918 -492)"/> </g> </svg>
                            <div>
                                <h3>{appAboutLanguage?.contact?.form?.email}:</h3>
                                <p>info@GlobalDynamicCorp.com</p>
                                {/* <p>username@domain.com</p> */}
                            </div>
                        </li>
                    </ul>
                    <ul className="social-medias">
                        <li>
                            <a className="fb" href="https://www.facebook.com/profile.php?id=100095372952327" target="_blank">
                                <p>Facebook</p>
                                <i className="fa-brands fa-facebook" />
                            </a>
                        </li>
                        <li>
                            <a className="tw" href="https://www.linkedin.com/company/global-dynamic-corp-s-a/" target="_blank">
                                <p>LinkedIn</p>
                                <i className="fa-brands fa-linkedin" />
                            </a>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* Contact Form 2 End */}

        {/* Contact Faqs Start */}
        {/* <section className="contact-faqs">
            <div className="heading">
                <figure>
                    <img src="/images/heading-icon.png" alt="Heading Icon" />
                </figure>
                <span>Frequently asked question</span>
                <h2>Finding Solutions For Your Idea</h2>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1" >
                    <div className="acc2">
                        <Accordion defaultActiveKey="contact-acc-0" alwaysOpen>
                            {faqData.items.map((item, key) => (
                            <Accordion.Item key={`contact-item-${key}`} eventKey={`contact-acc-${key}`}>
                                <Accordion.Header>
                                    {item.title}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <p>{item.text}</p>
                                </Accordion.Body>
                            </Accordion.Item>
                            ))}
                        </Accordion>
                    </div>
                    </div>
                </div>
            </div>
        </section> */}
        {/* Contact Faqs End */}

        {/* Contact Map Start */}
        <div className="contact-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405.74403347019364!2d-90.53976254672679!3d14.649759527230593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a1e431ca7e75%3A0x3846375c7a8621a6!2sCrece!5e0!3m2!1sen!2sgt!4v1694404459933!5m2!1sen!2sgt" width="
            450" height="500" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        {/* Contact Map End */}
      
    </Layouts>
  );
};
export default Contact;
