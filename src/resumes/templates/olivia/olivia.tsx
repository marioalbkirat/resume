import { FaPhone } from "react-icons/fa"
import { FaLinkedin, FaLocationDot } from "react-icons/fa6"
import { MdEmail } from "react-icons/md"
import "./test.css";
export default function OliviaResume() {
    return (
        <main className="resume">
            <header>
                <h1>olivia cooper</h1>
                <h2>full stack developer</h2>
            </header>
            <div className="body">
                <div className="vertical">
                    <div className="left-side">
                        <section id="contact">
                            <h1>contact</h1>
                            <div className="items">
                                <div className="item">
                                    <FaPhone />
                                    <span>+1234567890</span>
                                </div>
                                <div className="item">
                                    <MdEmail />
                                    <span>mario.albkirat@gmail.com</span>
                                </div>
                                <div className="item">
                                    <FaLocationDot />
                                    <span>Amman, Jordan</span>
                                </div>
                                <div className="item">
                                    <FaLinkedin />
                                    <span>Amman, Jordan</span>
                                </div>
                            </div>
                        </section>
                        <section id="education">
                            <h1 >education</h1>
                            <div className="items">
                                <div className="item">
                                    <h2 >ENTER YOUR MAJOR</h2>
                                    <span>Name of the University</span>
                                    <span>2010-2014</span>
                                </div>
                                <div className="item">
                                    <h2 >ENTER YOUR MAJOR</h2>
                                    <span>Name of the University</span>
                                    <span>2010-2014</span>
                                </div>
                            </div>
                        </section>
                        <section id="tech-skills">
                            <h1>skills</h1>
                            <div className="items">
                                <span className="item">TECHNICAL SKILLS</span>
                                <span className="item">Adobe Photoshop</span>
                                <span className="item">Adobe Dreamweaver</span>
                                <span className="item">WordPress</span>
                                <span className="item">Joomla</span>
                                <span className="item"> Microsoft Word</span>
                                <span className="item"> Microsoft Excel</span>
                                <span className="item"> Microsoft PowerPoint</span>
                                <span className="item"> Microsoft Publisher</span>
                            </div>
                        </section>
                        <section id="hard-skills">
                            <h1>hard skills</h1>
                            <div className="items">
                                <span className="item">team work</span>
                                <span className="item">Adobe Photoshop</span>
                                <span className="item">Adobe Dreamweaver</span>
                                <span className="item">WordPress</span>
                                <span className="item">Joomla</span>
                                <span className="item"> Microsoft Word</span>
                                <span className="item"> Microsoft Excel</span>
                                <span className="item"> Microsoft PowerPoint</span>
                                <span className="item"> Microsoft Publisher</span>
                            </div>
                        </section>
                        <section id="languages">
                            <h1>languages</h1>
                            <div className="items">
                                <div className="item">
                                    <span>arabic </span>
                                    <span>nativ</span>
                                </div>
                                <div className="item">
                                    <span>english </span>
                                    <span>nativ</span>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div style={{ border: "1px solid hsl(0deg 0% 69.02%)", height: "1000px" }} className=""></div>
                    <div className="right-side">
                        <section id="profile">
                            <h1 >profile</h1>
                            <p >Profiles are the first opportunity to highlight a person&apos;s relevant career
                                experiences, skills, and what goals they are looking to achieve while in
                                his or her next position. Your profile should be customized to match the
                                qualifications the employer is seeking. Well written resume profiles are
                                concise and yet informative. Match the qualifications the employer .ng</p>
                        </section>
                        <section id="expireance">
                            <h1 >work expireance</h1>
                            <div className="items">
                                <div className="item">
                                    <h2 style={{ fontWeight: "700", color: "hsl(0deg 0% 34.9%)", fontSize: "15px" }}>YOUR JOB TITLE GOES HERE</h2>
                                    <h2 style={{ fontWeight: "700", color: "hsl(0deg 0% 34.9%)", fontSize: "15px" }}>Company Name | 2015 - 2019</h2>
                                    <p style={{ fontWeight: "500", color: "hsl(0deg 0% 34.9%)", fontSize: "15px" }}>Describe your responsibilities in concise statements led by strong verbs.
                                        Focus on those skills and strengths that you possess and that you have
                                        identified as being important to your field.</p>
                                    <ul style={{ fontWeight: "500", color: "hsl(0deg 0% 34.9%)", fontSize: "15px", margin: "0 0 0 1rem", padding: "1rem 0 0 0", listStyle: "inherit" }} className="tasks">
                                        <li>Targeting your resume to the job posting is the most important
                                            because it ensures your resume will actually get picked up as a
                                            good match for the job.</li>
                                        <li>Highlight the most important skills or requirements used in the
                                            job posting and sprinkle the exact words throughout you resume.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section className="projects">
                            <h1 >projects</h1>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}