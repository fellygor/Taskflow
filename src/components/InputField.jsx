import React from "react";

const InputField = ({
    label,
    type = "text",
    placeholder,
    maxLength,
    minLength, value, onChange,
    ...props
}) => {
    return (
        <div>
            <label 
                className="font-poppins font-semibold leading-none text-xs pb-0 text-black opacity-100 dark:text-gray-300">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                minLength={minLength}
                value={value}
                onChange={onChange}
                {...props}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all mb-4"
            />
        </div>
    );
};

export default InputField;
