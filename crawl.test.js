import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

test('normalizeURL should be stripped of  https protocol and ending slash', () => {
    expect(normalizeURL("https://example.com/")).toBe("example.com");
  });

test('normalizeURL should be stripped of https protocol', () => {
    expect(normalizeURL("https://example.com")).toBe("example.com");
  });

test('normalizeURL should just return provided value', () => {
    expect(normalizeURL("example.com")).toBe("example.com");
  });

test('normalizeURL should be stripped of http protocol and ending slash', () => {
    expect(normalizeURL("http://example.com/test/")).toBe("example.com/test");
  });

test('normalizeURL should be stripped of http protocol', () => {
    expect(normalizeURL("http://example.com")).toBe("example.com");
  });

test('normalizeURL should be made all lowercase', () => {
    expect(normalizeURL("EXAMPLE.com/PATH")).toBe("example.com/path");
  });

test('normalizeURL should be stripped of all ending slashes', () => {
    expect(normalizeURL("example.com/test//")).toBe("example.com/test");
  });


test('getURLsFromHTML relative without slash', () => {
    expect(getURLsFromHTML('<html><body><a href="ss.png"><span>Go to Boot.dev</span></a></body></html>',
     "https://example.com/")).toEqual(["https://example.com/ss.png"]);
  });

test('getURLsFromHTML relative with slash', () => {
    expect(getURLsFromHTML('<html><body><a href="/ss.png"><span>Go to Boot.dev</span></a></body></html>',
     "https://example.com/")).toEqual(["https://example.com/ss.png"]);
  });

test('getURLsFromHTML multiple links', () => {
    expect(getURLsFromHTML('<html><body><a href="https://example2.com/test"></a><a href="/ss.png"><span>Go to Boot.dev</span></a><a href="/kekw"><span>dev</span></a></body></html>',
     "https://example.com/")).toEqual(["https://example2.com/test","https://example.com/ss.png", "https://example.com/kekw"]);
  });