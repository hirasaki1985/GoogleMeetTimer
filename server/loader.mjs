import path from "path";

export async function resolve(specifier, context, defaultResolve) {
  if (specifier.startsWith("@/")) {
    const newPath = path.resolve(
      process.cwd(),
      "src",
      specifier.replace("@/", "")
    );
    return defaultResolve(newPath, context, defaultResolve);
  }
  return defaultResolve(specifier, context, defaultResolve);
}