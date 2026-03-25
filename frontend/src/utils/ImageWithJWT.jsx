/**
 * ImageWithJWT — <img> qui envoie le cookie JWT (credentials: "include")
 * pour les images protégées derrière une route admin.
 * Usage : <ImageWithJWT src={url} alt="..." />
 */
export default function ImageWithJWT({ src, alt, className, style }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      crossOrigin="use-credentials"
      loading="lazy"
    />
  );
}
