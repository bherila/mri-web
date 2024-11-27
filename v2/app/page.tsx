'use client';

import { LeadGenApi } from "@/lib/api/api";
import { formatPhone } from "@/lib/phone";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [optedIn, setOptedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const router = useRouter();
  const [err, setErr] = useState(null);
  
  function submitIndexForm(e: React.FormEvent<HTMLFormElement | HTMLInputElement>) {
		e.preventDefault();
		captureLead().then((_resp: any) => {
			router.push('/have-order');
		});
	}

	function captureLead() : Promise<any> {
		return new LeadGenApi().runPOST({
			req: {
				firstName: fname,
				lastName: lname,
				email: email,
				phone: phone
			},
			authToken: '',
		});
	}

  return (
    <section id="Q1" className="vspace80 w-container">
    <div className="vspace40 centered w-row">
      <div>
        <h3 style={{fontWeight: 'bold'}}>Ready to schedule your MRI?</h3>
        <h3>It's easy, we'll walk you through it step by step.</h3>
      </div>
    </div>
    <div className="vspace40 centered w-row">
      <div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
      <div className="w-col w-col-6">
        <div className="w-form">
          <form action="#" onSubmit={(e) => submitIndexForm(e)}>
            <label htmlFor="fname">First name</label>
            <input
              type="text"
              className="w-input centered"
              maxLength={256}
              name="fname"
              data-name="First Name"
              id="fname"
              value={fname}
              onChange={(e) => setFname(e.currentTarget.value)}
              onBlur={(e) => captureLead()}
            />

            <label htmlFor="lname">Last name</label>
            <input
              type="text"
              className="w-input centered"
              maxLength={256}
              name="lname"
              data-name="Last Name"
              id="lname"
              value={lname}
              onChange={(e) => setLname(e.currentTarget.value)}
              onBlur={() => captureLead()}
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              className="w-input centered"
              maxLength={256}
              name="email"
              data-name="Email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              onBlur={() => captureLead()}
            />

            <div className="inputrow">
              <label style={{fontWeight: 'normal', fontSize: '8pt'}}>
                <input
                  type="checkbox"
                  checked={optedIn}
                  value="yes"
                  onChange={(e) => setOptedIn(e.currentTarget.checked)}
                />&nbsp;
                It's OK to send me more information about ideal MRI. (We'll never share your information)
              </label>
            </div>

            <label htmlFor="email">Phone</label>
            <input
              type="text"
              className="w-input centered"
              maxLength={256}
              name="phone"
              data-name="Phone"
              id="phone"
              required={true}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.currentTarget.value))}
              onBlur={() => captureLead()}
            />

            <input
              type="submit"
              value="Let's begin!"
              data-wait="Please wait..."
              className={`${err ? 'disabled ' : ''}w-button`}
              disabled={!!err}
              onClick={(e) => submitIndexForm(e)}
            />
          </form>
        </div>
      </div>
      <div className="w-hidden-small w-hidden-tiny w-col w-col-3"/>
    </div>
  </section>
  );
}
