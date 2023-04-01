// import useOverview from "@/hooks/useOverview";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { JobStatus, JobType } from "@prisma/client";
// import { NextPageContext } from "next";
// import { getSession, signOut } from "next-auth/react";
// import React, { use, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import * as z from "zod";

// interface Props {}

// const schema = z.object({
//   company: z.string().nonempty(),
//   status: z.enum(["INTERVIEW", "DECLINED", "PENDING"]),
//   type: z.enum(["FULL_TIME", "PART_TIME", "REMOTE", "INTERNSHIP"]),
//   location: z.string().nonempty(),
//   position: z.string().nonempty(),
// });

// type FormData = z.infer<typeof schema>;

// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

// const Add = (props: Props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   // const [company, setCompany] = useState("");
//   // const [location, setLocation] = useState("");
//   // const [position, setPosition] = useState("");
//   // const [type, setType] = useState<JobType>(JobType.FULL_TIME);
//   // const [status, setStatus] = useState<JobStatus>(JobStatus.PENDING);
//   // const [error, setError] = useState<string | null>(null);

//   // const [isLoading, setIsLoading] = useState(false);

//   // const { mutate: mutateOverview } = useOverview();

//   // const onSubmit = async (e: any) => {
//   //   e.preventDefault();

//   //   setIsLoading(true);
//   //   try {
//   //     const res = await fetch("/api/jobs", {
//   //       method: "POST",
//   //       body: JSON.stringify({
//   //         company,
//   //         location,
//   //         position,
//   //         type,
//   //         status,
//   //       }),
//   //       headers: { "Content-Type": "application/json" },
//   //     });

//   //     if (res.ok) {
//   //       // console.log("success");
//   //       mutateOverview();
//   //     } else {
//   //       setError((await res.json()).error);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }

//   //   setIsLoading(false);
//   // };

//   const onSubmit: SubmitHandler<FormData> = async (data) => {
//     // e.preventDefault();
//     // setIsLoading(true);
//     try {
//       const response = await fetch("/api/jobs", {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.ok) {
//         console.log("SUCCESS");
//       } else {
//         console.log("ERROR");
//       }
//       // .then(() => console.log("success"))
//       // .catch(() => console.log("error"))
//       // .finally(() => setIsLoading(false));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     // <div>
//     //   <form onSubmit={onSubmit}>
//     //     <input
//     //       placeholder="company"
//     //       value={company}
//     //       onChange={(e) => setCompany(e.target.value)}
//     //     />

//     //     <input
//     //       placeholder="location"
//     //       value={location}
//     //       onChange={(e) => setLocation(e.target.value)}
//     //     />

//     //     <input
//     //       placeholder="position"
//     //       value={position}
//     //       onChange={(e) => setPosition(e.target.value)}
//     //     />

//     //     <label
//     //       // for="countries"
//     //       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     //     >
//     //       Job Status{" "}
//     //     </label>
//     //     <select
//     //       value={status}
//     //       onChange={(e) => setStatus(e.target.value as JobStatus)}
//     //       // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     //     >
//     //       <option value={JobStatus.PENDING}>Pending</option>
//     //       <option value={JobStatus.DECLINED}>Declined</option>
//     //       <option value={JobStatus.INTERVIEW}>Interview</option>
//     //     </select>

//     //     <label
//     //       // for="countries"
//     //       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     //     >
//     //       Job Type{" "}
//     //     </label>
//     //     <select
//     //       value={type}
//     //       onChange={(e) => setType(e.target.value as JobType)}
//     //       // className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     //     >
//     //       <option value={JobType.FULL_TIME}>Full Time</option>
//     //       <option value={JobType.INTERSHIP}>Internship</option>
//     //       <option value={JobType.PART_TIME}>Part Time</option>
//     //       <option value={JobType.REMOTE}>Remote</option>
//     //     </select>

//     //     <button type="submit">Submit</button>
//     //   </form>
//     // </div>

//     <div className="flex flex-col gap-4">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label htmlFor="company">Company</label>
//           <input type="text" id="company" {...register("company")} />
//           {errors?.company && <span>{errors.company.message}</span>}
//         </div>

//         <div>
//           <label htmlFor="status">Status</label>
//           <select id="status" {...register("status")}>
//             <option value="PENDING">Pending</option>
//             <option value="INTERVIEW">Interview</option>
//             <option value="DECLINED">Declined</option>

//             {errors?.status && <span>{errors.status.message}</span>}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="type">Type</label>
//           <select id="type" {...register("type")}>
//             <option value="FULL_TIME">Full Time</option>
//             <option value="PART_TIME">Part Time</option>
//             <option value="REMOTE">Remote</option>
//             <option value="INTERNSHIP">Internship</option>

//             {errors?.type && <span>{errors.type.message}</span>}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="location">Location</label>
//           <input type="text" id="location" {...register("location")} />
//           {errors?.location && <span>{errors.location.message}</span>}
//         </div>

//         <div>
//           <label htmlFor="position">Position</label>
//           <input type="text" id="position" {...register("position")} />
//           {errors?.position && <span>{errors.position.message}</span>}
//         </div>
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   );
// };

// export default Add;

import React from "react";

interface Props {}

const add = (props: Props) => {
  return <div>add</div>;
};

export default add;
