"use client";
import Link from "next/link";
import { createEmpoyee } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { convertToFile, resizeImage } from "@/lib/utils";
import Cropper from "react-cropper";
import Modal from "@/ui/modal";
import "cropperjs/dist/cropper.css";
import LoadingSpinner from "@/ui/loading-spinner";
import { redirect } from "next/navigation";

export default function CreateEmpoyeeForm() {
  // To reset form errors
  const [validationError, setValidationError] = useState({});

  const initialState = { errors: {}, message: {} };

  const [state, formAction] = useFormState(createEmpoyee, initialState);
  const [course, setCourse] = useState("");
  const inputFile = useRef(null);
  const [srcImage, setSrcImage] = useState();
  const [croppedImage, setCroppedImage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const cropperRef = useRef(null);
  const formRef = useRef(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleResetValidationErrors = () => {
    setValidationError({});
  };

  const handleImageSelection = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Resize image to less than 1 mb
      const resizedImageBlob = await resizeImage(file, 400, 400);

      setSrcImage(URL.createObjectURL(resizedImageBlob));

      openModal();
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const cropped = cropper.getCroppedCanvas().toDataURL();

    setCroppedImage(cropped);

    closeModal();
  };

  useEffect(() => {
    if (state.errors) {
      setValidationError(state);
    }
    if (state.success) {
      window.alert("Employee has been created");
      formRef.current.reset();
    }
  }, [state]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="h-full w-full">
          {srcImage && (
            <Cropper
              ref={cropperRef}
              initialAspectRatio={1}
              src={srcImage}
              viewMode={1}
              minCropBoxHeight={400}
              minCropBoxWidth={400}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              guides={true}
              dragMode="crop"
              aspectRatio={1 / 1}
            />
          )}
          <button
            onClick={handleCrop}
            type="submit"
            className=" mt-4 focus:outline-none bg-blue-700 text-white font-bold tracking-wider block w-full p-2 rounded-lg  hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </Modal>
      <div className="flex justify-center">
        <div className="bg-gray-50  rounded-lg sm:border-2 px-4 lg:px-6 py-10 w-[75%] text-center">
          <h1 className="text-2xl ">Create Employee</h1>
          <input
            accept="image/*"
            type="file"
            className="hidden"
            ref={inputFile}
            onChange={handleImageSelection}
          />
          <form action={formAction} className="text-center" ref={formRef}>
            <div className="py-2 flex">
              <div className="py-2 w-1/3 flex flex-col items-center ">
                <Image
                  src={croppedImage || "/assets/no-avatar.svg"}
                  alt="avatar logo"
                  width={200}
                  height={24}
                  onClick={() => inputFile.current.click()}
                  className="rounded-full p-1"
                />

                <input
                  type="type"
                  id="image"
                  name="image"
                  className="hidden"
                  value={croppedImage}
                />

                <p className="text-sm text-gray-900">Profile Picture</p>
              </div>

              <div className="flex-col w-[60%] space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label for="name">Name </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`border-2 ${
                        validationError?.errors?.name
                          ? "border-red-300"
                          : "border-gray-100"
                      } focus:outline-none w-3/4 block py-2 px-4 rounded-lg focus:border-gray-700 focus:border-[1px] `}
                      placeholder="Enter Name"
                      onChange={handleResetValidationErrors}
                      required
                    />
                  </div>
                  {validationError.errors?.name &&
                    validationError.errors.name.map((error) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label for="email">Email </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className={`border-2 ${
                        validationError?.errors?.email
                          ? "border-red-300"
                          : "border-gray-100"
                      } focus:outline-none w-3/4 block py-2 px-4 rounded-lg focus:border-gray-700 focus:border-[1px] `}
                      placeholder="Enter Email"
                      onChange={handleResetValidationErrors}
                      required
                    />
                  </div>
                  {validationError.errors?.email &&
                    validationError.errors.email.map((error) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label for="mobile">Mobile </label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      className={`border-2 ${
                        validationError?.errors?.mobile
                          ? "border-red-300"
                          : "border-gray-100"
                      } focus:outline-none w-3/4 block py-2 px-4 rounded-lg focus:border-gray-700 focus:border-[1px] `}
                      placeholder="Enter Mobile No."
                      onChange={handleResetValidationErrors}
                      required
                    />
                  </div>
                  {validationError.errors?.mobile &&
                    validationError.errors.mobile.map((error) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label for="designation">Designation </label>
                    <select
                      name="designation"
                      id="designation"
                      required
                      className={`border-2 ${
                        validationError?.errors?.designation
                          ? "border-red-300"
                          : "border-gray-100"
                      } focus:outline-none w-3/4 block py-2 px-4 rounded-lg focus:border-gray-700 focus:border-[1px] `}
                    >
                      {" "}
                      <option value="">Select Designation</option>
                      <option value="hr">HR</option>
                      <option value="manager">Manager</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                  {validationError.errors?.designation &&
                    validationError.errors.designation.map((error) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
                <div>
                  <fieldset className="flex gap-8 my-10">
                    <p>Gender</p>

                    <div className="pl-10 text-center">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                      />
                      <label for="male">Male</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                      />
                      <label for="female">Female</label>
                    </div>
                  </fieldset>
                  {validationError.errors?.gender &&
                    validationError.errors.gender.map((error) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
                <div>
                  <fieldset className="w-full flex gap-8 ">
                    <p>Course</p>

                    <div className="pl-10">
                      <input
                        type="checkbox"
                        id="mca"
                        name="course"
                        value="mca"
                        checked={course === "mca"}
                        onChange={(e) => setCourse(e.target.value)}
                      />
                      <label for="mca">MCA</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="bca"
                        value="bca"
                        name="course"
                        checked={course === "bca"}
                        onChange={(e) => setCourse(e.target.value)}
                      />
                      <label for="bca">BCA</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="bsc"
                        value="bsc"
                        name="course"
                        checked={course === "bsc"}
                        onChange={(e) => setCourse(e.target.value)}
                      />
                      <label for="bsc">BSc</label>
                    </div>
                  </fieldset>
                  {validationError.errors?.course &&
                    validationError.errors.course.map((error) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>
                        {error}
                      </p>
                    ))}
                </div>
              </div>
            </div>
            <div className="py-2">
              <Submit />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function Submit() {
  const status = useFormStatus();

  return (
    <button
      className="focus:outline-none bg-slate-900 text-white font-bold tracking-wider block w-full p-2 rounded-lg disabled:bg-gray-600"
      disabled={status.pending}
    >
      {status.pending ? (
        <LoadingSpinner height={20} width={20} />
      ) : (
        <div>Submit</div>
      )}
    </button>
  );
}
