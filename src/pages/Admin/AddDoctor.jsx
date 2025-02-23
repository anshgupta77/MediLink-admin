

// import React, { useContext, useState } from 'react'
// import { assets } from '../../assets/assets_admin/assets'
// import { AdminContext } from '../../context/AdminContext'
// import { toast } from 'react-toastify'
// import LoadingOverlay from '../../components/LoadingOverlay'
// import axios from 'axios'

// const AddDoctor = () => {
//   const [docImg, setDocImg] = useState(false)
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [experience, setExperience] = useState("4")
//   const [fees, setFees] = useState(250)
//   const [about, setAbout] = useState("Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.")
//   const [speciality, setSpeciality] = useState("General physician")
//   const [degree, setDegree] = useState("MBBS")
//   const [address1, setAddress1] = useState("57th Cross, Richmond")
//   const [address2, setAddress2] = useState("Circle, Ring Road, London")
//   const [loading, setLoading] = useState(false)
//   const { backendUrl, aToken } = useContext(AdminContext)

//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       if (!docImg) {
//         return toast.error('Please upload doctor image')
//       }

//       const formData = new FormData()
//       formData.append('image', docImg)
//       formData.append('name', name)
//       formData.append('email', email)
//       formData.append('password', password)
//       formData.append('experience', experience)
//       formData.append('fees', fees)
//       formData.append('about', about)
//       formData.append('speciality', speciality)
//       formData.append('degree', degree)
//       formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

//       // console.log(formData)
//       formData.forEach((value, key) => {
//         console.log(`${key} : ${value}`)
//       })

//       const { data } = await axios.post(`http://localhost:4000/api/admin/add-doctor`, formData, { headers: { aToken } })
//       console.log(data)

//       if (data.success) {
//         toast.success(data.message)
//         setDocImg(false)
//         setName("")
//         setEmail("")
//         setPassword("")
//         setExperience("4")
//         setFees(250)
//         setAbout("Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.")
//         setSpeciality("General physician")
//         setDegree("MBBS")
//         setAddress1("57th Cross, Richmond")
//         setAddress2("Circle, Ring Road, London")
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//       console.log(error)
//     } finally {
//       setLoading(false)
//     }

//   }

//   if(loading) {
//     return <LoadingOverlay/>
//   }

//   const inputStyle = "bg-white/5 border border-white/20 rounded px-3 py-2 text-[#d3bccc] placeholder-[#d3bccc]/50 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
//   const labelStyle = "text-[#d3bccc]/70"
//   const selectStyle = "bg-white/5 border border-white/20 rounded px-3 py-2 text-[#d3bccc] focus:outline-none focus:border-purple-500/50 transition-all duration-300"

//   return (
//     <form onSubmit={onSubmitHandler} className="w-full bg-[#130e3d] text-[#d3bccc] p-6 min-h-screen">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
//           Add New Doctor
//         </h1>
//         <p className="text-[#d3bccc]/70 mt-2">Enter doctor details to add them to the system</p>
//       </div>

//       <div className="bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm p-8 max-w-4xl">
//         <div className="flex items-center gap-4 mb-8 text-[#d3bccc]/70">
//           <label htmlFor="doc-img" className="relative group cursor-pointer">
//             <img 
//               className="w-20 h-20 rounded-full border-2 border-white/20 object-cover transition-all duration-300 group-hover:border-purple-500/50" 
//               src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
//               alt="" 
//             />
//             <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </label>
//           <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
//           <p className="text-[#d3bccc]/70">Upload doctor picture</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column */}
//           <div className="space-y-4">
//             <div>
//               <p className={labelStyle}>Doctor Name</p>
//               <input 
//                 onChange={(e) => setName(e.target.value)} 
//                 value={name} 
//                 className={inputStyle}
//                 type="text" 
//                 placeholder="Enter doctor name" 
//                 required 
//               />
//             </div>

//             <div>
//               <p className={labelStyle}>Email Address</p>
//               <input 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 value={email} 
//                 className={inputStyle}
//                 type="email" 
//                 placeholder="Enter email address" 
//                 required 
//               />
//             </div>

//             <div>
//               <p className={labelStyle}>Password</p>
//               <input 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 value={password} 
//                 className={inputStyle}
//                 type="password" 
//                 placeholder="Enter password" 
//                 required 
//               />
//             </div>

//             <div>
//               <p className={labelStyle}>Experience</p>
//               <select 
//                 onChange={(e) => setExperience(e.target.value)} 
//                 value={experience} 
//                 className={selectStyle}
//               >
//                 {[...Array(10)].map((_, i) => (
//                   <option key={i + 1} value={i + 1}>{i + 1} year{i !== 0 && 's'}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <p className={labelStyle}>Consultation Fees</p>
//               <input 
//                 onChange={(e) => setFees(e.target.value)} 
//                 value={fees} 
//                 className={inputStyle}
//                 type="number" 
//                 placeholder="Enter consultation fees" 
//                 required 
//               />
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-4">
//             <div>
//               <p className={labelStyle}>Speciality</p>
//               <select 
//                 onChange={(e) => setSpeciality(e.target.value)} 
//                 value={speciality} 
//                 className={selectStyle}
//               >
//                 <option value="General physician">General physician</option>
//                 <option value="Gynecologist">Gynecologist</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Pediatrician">Pediatrician</option>
//                 <option value="Neurologist">Neurologist</option>
//                 <option value="Gastroenterologist">Gastroenterologist</option>
//               </select>
//             </div>

//             <div>
//               <p className={labelStyle}>Education</p>
//               <input 
//                 onChange={(e) => setDegree(e.target.value)} 
//                 value={degree} 
//                 className={inputStyle}
//                 type="text" 
//                 placeholder="Enter education details" 
//                 required 
//               />
//             </div>

//             <div>
//               <p className={labelStyle}>Address</p>
//               <input 
//                 onChange={(e) => setAddress1(e.target.value)} 
//                 value={address1} 
//                 className={`${inputStyle} mb-2`}
//                 type="text" 
//                 placeholder="Address line 1" 
//                 required 
//               />
//               <input 
//                 onChange={(e) => setAddress2(e.target.value)} 
//                 value={address2} 
//                 className={inputStyle}
//                 type="text" 
//                 placeholder="Address line 2" 
//                 required 
//               />
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <p className={labelStyle}>About Doctor</p>
//           <textarea 
//             onChange={(e) => setAbout(e.target.value)} 
//             value={about} 
//             className={`${inputStyle} w-full min-h-[120px] resize-y`}
//             placeholder="Write about the doctor's background and expertise" 
//             required 
//           />
//         </div>

//         <button 
//           type="submit" 
//           className="mt-8 px-8 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
//         >
//           Add Doctor
//         </button>
//       </div>
//     </form>
//   )
// }

// export default AddDoctor







import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import LoadingOverlay from '../../components/LoadingOverlay'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [experience, setExperience] = useState("4")
  const [fees, setFees] = useState(250)
  const [about, setAbout] = useState("Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.")
  const [speciality, setSpeciality] = useState("General physician")
  const [degree, setDegree] = useState("MBBS")
  const [address1, setAddress1] = useState("57th Cross, Richmond")
  const [address2, setAddress2] = useState("Circle, Ring Road, London")
  const [loading, setLoading] = useState(false)
  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!docImg) {
        return toast.error('Please upload doctor image')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', fees)
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(`http://localhost:4000/api/admin/add-doctor`, formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName("")
        setEmail("")
        setPassword("")
        setExperience("4")
        setFees(250)
        setAbout("Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.")
        setSpeciality("General physician")
        setDegree("MBBS")
        setAddress1("57th Cross, Richmond")
        setAddress2("Circle, Ring Road, London")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if(loading) {
    return <LoadingOverlay/>
  }

  const inputStyle = "w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-[#d3bccc] placeholder-[#d3bccc]/50 focus:outline-none focus:border-purple-500/50 transition-all duration-300"
  const labelStyle = "text-[#d3bccc]/70 text-sm md:text-base"
  const selectStyle = "w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-[#d3bccc] focus:outline-none focus:border-purple-500/50 transition-all duration-300"

  return (
    <form onSubmit={onSubmitHandler} className="w-full bg-[#130e3d] text-[#d3bccc] p-4 md:p-6 min-h-screen">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
          Add New Doctor
        </h1>
        <p className="text-sm md:text-base text-[#d3bccc]/70 mt-2">Enter doctor details to add them to the system</p>
      </div>

      <div className="bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm p-4 md:p-8 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6 md:mb-8 text-[#d3bccc]/70">
          <label htmlFor="doc-img" className="relative group cursor-pointer">
            <img 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 object-cover transition-all duration-300 group-hover:border-purple-500/50" 
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
              alt="" 
            />
            <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p className="text-sm md:text-base text-[#d3bccc]/70">Upload doctor picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className={labelStyle}>Doctor Name</p>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className={inputStyle}
                type="text" 
                placeholder="Enter doctor name" 
                required 
              />
            </div>

            <div>
              <p className={labelStyle}>Email Address</p>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                className={inputStyle}
                type="email" 
                placeholder="Enter email address" 
                required 
              />
            </div>

            <div>
              <p className={labelStyle}>Password</p>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                className={inputStyle}
                type="password" 
                placeholder="Enter password" 
                required 
              />
            </div>

            <div>
              <p className={labelStyle}>Experience</p>
              <select 
                onChange={(e) => setExperience(e.target.value)} 
                value={experience} 
                className={selectStyle}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} year{i !== 0 && 's'}</option>
                ))}
              </select>
            </div>

            <div>
              <p className={labelStyle}>Consultation Fees</p>
              <input 
                onChange={(e) => setFees(e.target.value)} 
                value={fees} 
                className={inputStyle}
                type="number" 
                placeholder="Enter consultation fees" 
                required 
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className={labelStyle}>Speciality</p>
              <select 
                onChange={(e) => setSpeciality(e.target.value)} 
                value={speciality} 
                className={selectStyle}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className={labelStyle}>Education</p>
              <input 
                onChange={(e) => setDegree(e.target.value)} 
                value={degree} 
                className={inputStyle}
                type="text" 
                placeholder="Enter education details" 
                required 
              />
            </div>

            <div>
              <p className={labelStyle}>Address</p>
              <input 
                onChange={(e) => setAddress1(e.target.value)} 
                value={address1} 
                className={`${inputStyle} mb-2`}
                type="text" 
                placeholder="Address line 1" 
                required 
              />
              <input 
                onChange={(e) => setAddress2(e.target.value)} 
                value={address2} 
                className={inputStyle}
                type="text" 
                placeholder="Address line 2" 
                required 
              />
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <p className={labelStyle}>About Doctor</p>
          <textarea 
            onChange={(e) => setAbout(e.target.value)} 
            value={about} 
            className={`${inputStyle} w-full min-h-[120px] resize-y`}
            placeholder="Write about the doctor's background and expertise" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full md:w-auto mt-6 md:mt-8 px-6 md:px-8 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300"
        >
          Add Doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
