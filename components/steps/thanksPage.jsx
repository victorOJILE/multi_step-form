
export default function ThankYou() {
  return (
    <div className="py-12 text-center">
      <img
        className="mx-auto w-12"
        src="icon-thank-you.svg"
        alt="Check mark"
      />
      <h1 className="text-xl py-4">
        <strong>Thank you!</strong>
      </h1>
      <p className="coolGray fontMedium text-sm leading-relaxed">
        Thanks for confirming your subscription! We hope you have fun
        using our platform. If you ever need support, please feel free to
        email us at support@loremgaming.com.
      </p>
    </div>
  );
}